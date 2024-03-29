import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaModule],
  controllers: [],
})
export class PrismaModule {
  constructor() {
    console.log('PrismaModule initialized');
  }
}
