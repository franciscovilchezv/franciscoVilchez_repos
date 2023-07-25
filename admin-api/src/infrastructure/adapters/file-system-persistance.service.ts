import { Injectable } from '@nestjs/common';
import { IDiskPersistance } from '../../domain/adapters/disk-persistance.interface';
import { writeFileSync } from 'fs';
import { randomUUID } from 'crypto';

@Injectable()
export class FileSystemPersistanceService implements IDiskPersistance {
  persistData(data: string): Promise<string> {
    const filePath = `reports/${randomUUID()}.csv`;
    writeFileSync(filePath, data, { flag: 'a' });
    return Promise.resolve(filePath);
  }
}
