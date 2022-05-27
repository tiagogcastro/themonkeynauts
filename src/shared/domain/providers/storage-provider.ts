interface IStorageProvider {
    saveFile(filename: string, folder: string): Promise<string>;
    deleteFile(filename: string, folder: string): Promise<void>;
}
  
export { IStorageProvider };
  