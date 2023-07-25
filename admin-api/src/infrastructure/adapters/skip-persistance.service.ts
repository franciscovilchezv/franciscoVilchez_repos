import { Injectable } from '@nestjs/common';
import { IDiskPersistance } from '../../domain/adapters/disk-persistance.interface';

@Injectable()
export class SkipPersistanceService implements IDiskPersistance {
  persistData(data: string): Promise<string> {
    console.log(data);
    return;
  }
}
