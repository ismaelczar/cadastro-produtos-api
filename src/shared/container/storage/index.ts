import { container } from 'tsyringe';

import { DiskStorageProvider } from '../../providers/storage/implementations/DiskStorageProvider';
import { IStorageProvider } from '../../providers/storage/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
