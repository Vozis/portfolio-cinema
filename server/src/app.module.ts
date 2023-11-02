import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { GenreModule } from './genre/genre.module';
import { MovieModule } from './movie/movie.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { ActorModule } from './actor/actor.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
    AuthModule,
    UsersModule,
    GenreModule,
    MovieModule,
    FileModule,
    ActorModule,
    RatingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    AuthService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
