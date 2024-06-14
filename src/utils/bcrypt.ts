import * as bcrypt from 'bcrypt';

export async function encodePassword(password: string): Promise<string> {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hash(password, SALT);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
