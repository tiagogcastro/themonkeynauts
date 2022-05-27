import { compare, compareSync, hash } from 'bcrypt';

class BCryptHashProvider implements IHashProvider {
  compareHashSync(payload: string, hashed: string): boolean {
    return compareSync(payload, hashed);
  }
  
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export { BCryptHashProvider };
