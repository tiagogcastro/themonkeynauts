interface IHashProvider {
    generateHash(payload: string): Promise<string>;
    compareHash(payload: string, hashed: string): Promise<boolean>;
    compareHashSync(payload: string, hashed: string): boolean;
}

export { IHashProvider };
  