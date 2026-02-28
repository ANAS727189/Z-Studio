package schema

func ValidateZLangPayload(body map[string]any) (string, string) {
	codeRaw, exists := body["code"]
	if !exists {
		return "", "Code is required"
	}

	code, ok := codeRaw.(string)
	if !ok || len(code) < 1 {
		return "", "Code is required"
	}

	return code, ""
}
