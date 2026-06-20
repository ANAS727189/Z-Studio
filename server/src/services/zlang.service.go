package services

import (
	"bytes"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

type CompilerError struct {
	Message     string
	Logs        string
	Suggestions string
}

type ZLangService struct {
	CompilerPath string
}

func findLLI() (string, error) {
	candidates := []string{"lli", "lli-14", "lli.exe", "lli-14.exe"}

	for _, name := range candidates {
		if path, err := exec.LookPath(name); err == nil {
			return path, nil
		}
	}

	return "", fmt.Errorf("LLVM interpreter not found in PATH")
}


func NewZLangService(compilerPath string) *ZLangService {
	return &ZLangService{CompilerPath: compilerPath}
}

func (s *ZLangService) Run(code string) (string, string, *CompilerError) {
	compilerPath := strings.TrimSpace(s.CompilerPath)
	if compilerPath == "" {
		return "", "", buildCompilerError("COMPILER_PATH is not set", "")
	}

	info, err := os.Stat(compilerPath)
	if err != nil || info.IsDir() {
		return "", "", buildCompilerError("Compiler script not found at: "+compilerPath, "")
	}

	tempDir, err := os.MkdirTemp("", "zlang-*")
	if err != nil {
		return "", "", buildCompilerError(err.Error(), "")
	}
	defer os.RemoveAll(tempDir)

	inputPath := filepath.Join(tempDir, "input.z--")
	if err := os.WriteFile(inputPath, []byte(code), 0644); err != nil {
		return "", "", buildCompilerError(err.Error(), "")
	}

	outputBase := filepath.Join(tempDir, "output")
	outputLLPath := outputBase + ".ll"
	outputCPath := outputBase + ".c"

	defer func() {
		_ = os.Remove(outputLLPath)
		_ = os.Remove(outputCPath)
	}()

	compilerOutput, compilerErrLogs, err := runCommand(tempDir, "node", compilerPath, inputPath, outputBase)
	if err != nil {
		message := strings.TrimSpace(compilerErrLogs)
		if message == "" {
			message = err.Error()
		}
		return "", "", buildCompilerError(message, compilerErrLogs)
	}

	lliPath, err := findLLI()
	if err != nil {
		return "", "", buildCompilerError(err.Error(), "")
	}

	programOutput, programErrLogs, err := runCommand(tempDir, lliPath, outputLLPath)
	if err != nil {
		message := strings.TrimSpace(programErrLogs)
		if message == "" {
			message = err.Error()
		}
		return "", "", buildCompilerError(message, programErrLogs)
	}

	_ = compilerOutput
	return compilerOutput, programOutput, nil
}

func runCommand(dir string, name string, args ...string) (string, string, error) {
	cmd := exec.Command(name, args...)
	cmd.Dir = dir

	var stdout bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	err := cmd.Run()
	return stdout.String(), stderr.String(), err
}

func buildCompilerError(message, logs string) *CompilerError {
	cleanMessage := strings.TrimSpace(message)
	if cleanMessage == "" {
		cleanMessage = "Compilation failed"
	}

	cleanLogs := strings.TrimSpace(logs)
	if cleanLogs == "" {
		cleanLogs = cleanMessage
	}

	suggestions := ""
	if strings.TrimSpace(logs) != "" {
		suggestions = "Check syntax and ensure valid Z-- code structure."
	}

	return &CompilerError{
		Message:     cleanMessage,
		Logs:        cleanLogs,
		Suggestions: suggestions,
	}
}