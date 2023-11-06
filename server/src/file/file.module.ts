import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [FileController],
  providers: [FileService, PrismaService],
  exports: [FileService],
})
export class FileModule {}
