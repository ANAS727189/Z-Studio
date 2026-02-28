package config

import (
	"bufio"
	"os"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
)

type Config struct {
	Port            string
	MaxRequests     int
	MaxMilliseconds int
	MaxRPS          int
	WindowMS        int
	MaxWindowMS     int
	Judge0BaseURI   string
	RapidAPIKey     string
	RapidAPIURI     string
	CompilerPath    string
	CORSOrigin      string
}

func LoadDotEnv(path string) error {
	file, err := os.Open(path)
	if err != nil {
		if os.IsNotExist(err) {
			return nil
		}
		return err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		parts := strings.SplitN(line, "=", 2)
		if len(parts) != 2 {
			continue
		}

		key := strings.TrimSpace(parts[0])
		value := strings.TrimSpace(parts[1])
		value = strings.Trim(value, `"'`)

		if key == "" {
			continue
		}
		if _, exists := os.LookupEnv(key); !exists {
			_ = os.Setenv(key, value)
		}
	}

	return scanner.Err()
}

func Load() Config {
	compilerPath := getenv("COMPILER_PATH", "")

	return Config{
		Port:            getenv("PORT", "3000"),
		MaxRequests:     getenvInt("MAX_REQUESTS", 2),
		MaxMilliseconds: getenvInt("MAX_MILLISECONDS", 1000),
		MaxRPS:          getenvInt("MAX_RPS", 2),
		WindowMS:        getenvInt("WINDOW_MS", 60000),
		MaxWindowMS:     getenvInt("MAX_WINDOW_MS", 10),
		Judge0BaseURI:   getenv("JUDGE0_BASE_URI", ""),
		RapidAPIKey:     getenv("RAPID_API_KEY", ""),
		RapidAPIURI:     getenv("RAPID_API_URI", ""),
		CompilerPath:    resolveCompilerPath(compilerPath),
		CORSOrigin:      getenv("CORS_ORIGIN", "*"),
	}
}

func getenv(key, defaultValue string) string {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return defaultValue
	}
	return value
}

func getenvInt(key string, defaultValue int) int {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return defaultValue
	}

	parsed, err := strconv.Atoi(value)
	if err != nil {
		return defaultValue
	}
	return parsed
}

func resolveCompilerPath(configuredPath string) string {
	configuredPath = strings.TrimSpace(configuredPath)

	repoRoot := ""
	if _, sourceFile, _, ok := runtime.Caller(0); ok {
		repoRoot = filepath.Clean(filepath.Join(filepath.Dir(sourceFile), "..", "..", ".."))
	}

	candidates := []string{
		configuredPath,
		filepath.Join("..", "Compiler", "src", "index.js"),
		filepath.Join("Compiler", "src", "index.js"),
		"/app/Compiler/src/index.js",
	}
	if repoRoot != "" {
		candidates = append(candidates, filepath.Join(repoRoot, "Compiler", "src", "index.js"))
	}

	seen := make(map[string]struct{}, len(candidates))
	for _, candidate := range candidates {
		candidate = strings.TrimSpace(candidate)
		if candidate == "" {
			continue
		}

		absPath := candidate
		if !filepath.IsAbs(absPath) {
			converted, err := filepath.Abs(absPath)
			if err != nil {
				continue
			}
			absPath = converted
		}
		absPath = filepath.Clean(absPath)

		if _, exists := seen[absPath]; exists {
			continue
		}
		seen[absPath] = struct{}{}

		info, err := os.Stat(absPath)
		if err == nil && !info.IsDir() {
			return absPath
		}
	}

	return configuredPath
}
