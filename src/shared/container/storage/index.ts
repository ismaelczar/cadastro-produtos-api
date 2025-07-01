import { container } from 'tsyringe';

import { DiskStorageProvider } from '@shared/providers/storage/DiskStorageProvider';
import { IStorageProvider } from '../../providers/storage/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
