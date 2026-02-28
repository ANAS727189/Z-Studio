package schema

import (
	"encoding/json"
	"strings"
)

type Judge0CompilePayload struct {
	LanguageID int     `json:"language_id"`
	SourceCode string  `json:"source_code"`
	Stdin      *string `json:"stdin,omitempty"`
}

func ValidateJudge0Payload(body map[string]any) (Judge0CompilePayload, string) {
	var errorsList []string
	var payload Judge0CompilePayload

	languageIDRaw, exists := body["language_id"]
	if !exists {
		errorsList = append(errorsList, "Language ID must be a positive integer")
	} else {
		languageID, ok := parsePositiveInt(languageIDRaw)
		if !ok {
			errorsList = append(errorsList, "Language ID must be a positive integer")
		} else {
			payload.LanguageID = languageID
		}
	}

	sourceCodeRaw, exists := body["source_code"]
	if !exists {
		errorsList = append(errorsList, "Source code is required")
	} else {
		sourceCode, ok := sourceCodeRaw.(string)
		if !ok || len(sourceCode) < 1 {
			errorsList = append(errorsList, "Source code is required")
		} else {
			payload.SourceCode = sourceCode
		}
	}

	if stdinRaw, exists := body["stdin"]; exists {
		stdin, ok := stdinRaw.(string)
		if !ok {
			errorsList = append(errorsList, "stdin must be a string")
		} else {
			payload.Stdin = &stdin
		}
	}

	if len(errorsList) > 0 {
		return Judge0CompilePayload{}, strings.Join(errorsList, ", ")
	}
	return payload, ""
}

func parsePositiveInt(value any) (int, bool) {
	switch v := value.(type) {
	case json.Number:
		if parsed, err := v.Int64(); err == nil {
			if parsed <= 0 {
				return 0, false
			}
			return int(parsed), true
		}
		parsedFloat, err := v.Float64()
		if err != nil {
			return 0, false
		}
		if parsedFloat <= 0 || parsedFloat != float64(int64(parsedFloat)) {
			return 0, false
		}
		return int(parsedFloat), true
	case float64:
		if v <= 0 || v != float64(int64(v)) {
			return 0, false
		}
		return int(v), true
	case int:
		if v <= 0 {
			return 0, false
		}
		return v, true
	case int64:
		if v <= 0 {
			return 0, false
		}
		return int(v), true
	default:
		return 0, false
	}
}
