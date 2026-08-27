import { describe, it, expect } from "vitest";
import { TokenEncryptionService } from "../src/crypto/encryption.js";

describe("Token Encryption Service (AES-256-GCM)", () => {
  const secretKey = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
  const service = new TokenEncryptionService(secretKey, "v1");

  it("encrypts and decrypts OAuth tokens losslessly", () => {
    const rawToken = "1//04abc_google_oauth_refresh_token_xyz789";
    const encrypted = service.encrypt(rawToken);

    expect(encrypted.ciphertext).toBeDefined();
    expect(encrypted.iv).toBeDefined();
    expect(encrypted.authTag).toBeDefined();
    expect(encrypted.keyVersion).toBe("v1");
    expect(encrypted.ciphertext).not.toBe(rawToken);

    const decrypted = service.decrypt(encrypted);
    expect(decrypted).toBe(rawToken);
  });

  it("fails decryption if auth tag is tampered with", () => {
    const rawToken = "sample_refresh_token";
    const encrypted = service.encrypt(rawToken);

    const tampered = {
      ...encrypted,
      authTag: "00000000000000000000000000000000",
    };

    expect(() => service.decrypt(tampered)).toThrow();
  });

  it("supports key rotation across key versions", () => {
    const v1Key = "1111111111111111111111111111111111111111111111111111111111111111";
    const v2Key = "2222222222222222222222222222222222222222222222222222222222222222";

    const v1Service = new TokenEncryptionService(v1Key, "v1");
    const encryptedV1 = v1Service.encrypt("my_secret_token");

    // Multi-key service
    const multiKeyService = new TokenEncryptionService(v2Key, "v2", {
      v1: v1Key,
      v2: v2Key,
    });

    const decrypted = multiKeyService.decrypt(encryptedV1);
    expect(decrypted).toBe("my_secret_token");
  });
});
