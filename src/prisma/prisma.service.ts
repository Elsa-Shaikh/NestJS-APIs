import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { dataurl } from 'src/utils/constants';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: dataurl,
        },
      },
    });
  }
}
