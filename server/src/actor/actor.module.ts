import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { PrismaService } from '../prisma.service';
import { FileModule } from '../file/file.module';

@Module({
  imports: [FileModule],
  controllers: [ActorController],
  providers: [ActorService, PrismaService],
  exports: [ActorService],
})
export class ActorModule {}
