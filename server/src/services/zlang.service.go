package services

import (
	"bytes"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"time"
)

type CompilerError struct {
	Message     string
	Logs        string
	Suggestions string
}

type ZLangService struct {
	CompilerPath string
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

	tempFile, err := os.CreateTemp("/tmp", "temp-*.z--")
	if err != nil {
		return "", "", buildCompilerError(err.Error(), "")
	}

	tempFilePath := tempFile.Name()
	if _, err := tempFile.WriteString(code); err != nil {
		_ = tempFile.Close()
		_ = os.Remove(tempFilePath)
		return "", "", buildCompilerError(err.Error(), "")
	}

	if err := tempFile.Close(); err != nil {
		_ = os.Remove(tempFilePath)
		return "", "", buildCompilerError(err.Error(), "")
	}

	uniquePart := strings.TrimPrefix(strings.TrimSuffix(filepath.Base(tempFilePath), ".z--"), "temp-")
	if uniquePart == "" {
		uniquePart = strconv.FormatInt(time.Now().UnixNano(), 10)
	}

	outputBase := filepath.Join("/tmp", "output-"+uniquePart)
	outputLLPath := outputBase + ".ll"
	outputCPath := outputBase + ".c"

	defer func() {
		_ = os.Remove(tempFilePath)
		_ = os.Remove(outputLLPath)
		_ = os.Remove(outputCPath)
	}()

	compilerOutput, compilerErrLogs, err := runCommand("/tmp", "node", compilerPath, tempFilePath, outputBase)
	if err != nil {
		message := compilerErrLogs
		if strings.TrimSpace(message) == "" {
			message = err.Error()
		}
		return "", "", buildCompilerError(message, compilerErrLogs)
	}

	programOutput, programErrLogs, err := runCommand("/tmp", "lli-14", outputLLPath)
	if err != nil {
		message := programErrLogs
		if strings.TrimSpace(message) == "" {
			message = err.Error()
		}
		return "", "", buildCompilerError(message, programErrLogs)
	}

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

	cleanLogs := logs
	if strings.TrimSpace(cleanLogs) == "" {
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
