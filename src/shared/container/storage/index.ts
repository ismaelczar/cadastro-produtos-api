import { container } from 'tsyringe';

import { DiskStorageProvider } from '@shared/providers/storage/services/DiskStorageProvider';
import { IStorageProvider } from '../../providers/storage/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
