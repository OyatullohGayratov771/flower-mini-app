package utils

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"sort"
	"strings"
)

func VerifyTelegramInitData(rawInitData, botToken string) (bool, error) {
	// Step 1: Split by & and = to preserve URL-encoding
	parts := strings.Split(rawInitData, "&")
	dataMap := map[string]string{}
	var hash string

	for _, part := range parts {
		kv := strings.SplitN(part, "=", 2)
		if len(kv) != 2 {
			continue
		}
		k, v := kv[0], kv[1]
		if k == "hash" {
			hash = v
		} else {
			dataMap[k] = v
		}
	}

	if hash == "" {
		return false, errors.New("missing hash")
	}

	// Step 2: Build dataCheck string
	var keys []string
	for k := range dataMap {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	var pairs []string
	for _, k := range keys {
		pairs = append(pairs, k+"="+dataMap[k]) // ⚠️ keep URL-encoded values
	}
	dataCheck := strings.Join(pairs, "\n")

	// Step 3: Compute secret key
	h := hmac.New(sha256.New, []byte(botToken))
	h.Write([]byte("WebAppData"))
	secretKey := h.Sum(nil)

	// Step 4: Compute HMAC of dataCheck
	mac := hmac.New(sha256.New, secretKey)
	mac.Write([]byte(dataCheck))
	expected := hex.EncodeToString(mac.Sum(nil))

	// Step 5: Compare hashes
	if !hmac.Equal([]byte(expected), []byte(hash)) {
		return false, fmt.Errorf("hash mismatch: expected %s got %s\ndataCheck=%s",
			expected, hash, dataCheck)
	}

	return true, nil
}
