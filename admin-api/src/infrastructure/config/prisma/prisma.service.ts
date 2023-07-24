import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { spawn } from 'cross-spawn';
import which = require('npm-which');

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async reset() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        "You are calling db.$reset() in a production environment. We think you probably didn't mean to do that, so we are throwing this error instead of destroying your life's work.",
      );
    }
    const prismaBin = which(process.cwd()).sync('prisma');
    await new Promise((res, rej) => {
      const process = spawn(prismaBin, ['migrate', 'reset', '--force'], {
        stdio: 'ignore',
      });
      process.on('exit', (code) => (code === 0 ? res(0) : rej(code)));
    });
    this.$disconnect();
  }
}
