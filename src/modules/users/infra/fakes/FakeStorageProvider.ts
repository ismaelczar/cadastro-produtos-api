import { IStorageProvider } from '@shared/providers/storage/IStorageProvider';

export class FakeStorageProvider implements IStorageProvider {
  storage: string[] = [];

  async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const fileIndex = this.storage.findIndex((fileIndex) => fileIndex === file);

    this.storage.splice(fileIndex, 1);
  }
}
