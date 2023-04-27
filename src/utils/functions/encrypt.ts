import * as crypto from 'crypto';

export function encryptSHA256(data: string) {
  return crypto.createHash('sha256').update(data).digest('hex');
}
