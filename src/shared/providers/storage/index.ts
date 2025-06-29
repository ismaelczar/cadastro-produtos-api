import { container } from 'tsyringe';

import { DiskStorageProvider } from './implementations/DiskStorageProvider';
import { IStorageProvider } from './IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
