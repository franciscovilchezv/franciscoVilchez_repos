import { Controller, Get } from '@nestjs/common';
import { CodesService } from './codes.service';

@Controller('codes')
export class CodesController {
  constructor(private readonly codesService: CodesService) {}

  @Get()
  getCodes() {
    return this.codesService.getCodes();
  }
}
