import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Prisma Patch for BigInt
declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
