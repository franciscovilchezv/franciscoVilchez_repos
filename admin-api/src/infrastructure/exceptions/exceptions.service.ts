import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IException,
  IExceptionMessage,
} from '../../domain/exception/exceptions.interface';

@Injectable()
export class ExceptionsService implements IException {
  notFoundException(data: IExceptionMessage): void {
    throw new NotFoundException(data);
  }
}
