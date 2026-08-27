import crypto from "node:crypto";

export interface EncryptedPayload {
  ciphertext: string; // hex
  iv: string; // hex (12 bytes)
  authTag: string; // hex (16 bytes)
  keyVersion: string;
}

export class TokenEncryptionService {
  private primaryKey: Buffer;
  private keyVersion: string;
  private keyring: Map<string, Buffer>;

  constructor(
    primaryKeyHexOrString: string,
    keyVersion = "v1",
    additionalKeys: Record<string, string> = {}
  ) {
    this.keyVersion = keyVersion;
    this.primaryKey = this.normalizeKey(primaryKeyHexOrString);
    this.keyring = new Map();
    this.keyring.set(keyVersion, this.primaryKey);

    for (const [ver, k] of Object.entries(additionalKeys)) {
      this.keyring.set(ver, this.normalizeKey(k));
    }
  }

  private normalizeKey(rawKey: string): Buffer {
    // If it's a 64-char hex string, parse as hex (32 bytes)
    if (/^[0-9a-fA-F]{64}$/.test(rawKey)) {
      return Buffer.from(rawKey, "hex");
    }
    // Otherwise use sha256 to derive a deterministic 32-byte key
    return crypto.createHash("sha256").update(rawKey, "utf8").digest();
  }

  encrypt(plaintext: string): EncryptedPayload {
    if (!plaintext) {
      throw new Error("Cannot encrypt empty or null plaintext");
    }

    const iv = crypto.randomBytes(12); // 96-bit IV recommended for AES-GCM
    const cipher = crypto.createCipheriv("aes-256-gcm", this.primaryKey, iv);

    let ciphertext = cipher.update(plaintext, "utf8", "hex");
    ciphertext += cipher.final("hex");
    const authTag = cipher.getAuthTag().toString("hex");

    return {
      ciphertext,
      iv: iv.toString("hex"),
      authTag,
      keyVersion: this.keyVersion,
    };
  }

  decrypt(payload: EncryptedPayload): string {
    const key = this.keyring.get(payload.keyVersion);
    if (!key) {
      throw new Error(`Encryption key version "${payload.keyVersion}" not found in keyring`);
    }

    const iv = Buffer.from(payload.iv, "hex");
    const authTag = Buffer.from(payload.authTag, "hex");

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);

    let plaintext = decipher.update(payload.ciphertext, "hex", "utf8");
    plaintext += decipher.final("utf8");

    return plaintext;
  }
}
