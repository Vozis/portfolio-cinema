import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import {
  returnActorObject,
  returnFullActorObject,
} from './return-actor.object';
import { FileService } from "../file/file.service";

@Injectable()
export class ActorService {
  constructor(private readonly prisma: PrismaService,
    private readonly fileService: FileService
    ) {}

  async getAll(searchTerm?: string) {
    const prismaSearchFilter: Prisma.ActorWhereInput = searchTerm
      ? {
          OR: [
            {
              slug: {
                contains: searchTerm,
                mode: 'insensitive',
              },
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    await this.updateCountMovies();

    return this.prisma.actor.findMany({
      where: prismaSearchFilter,
      select: returnActorObject,
    });
  }

  async getById(id: number) {
    const actor = await this.prisma.actor.findUnique({
      where: { id },
      select: returnFullActorObject,
    });

    if (!actor) throw new NotFoundException('Actor not found');

    return actor;
  }

  async getBySlug(slug: string) {
    const actor = await this.prisma.actor.findUnique({
      where: { slug },
      select: returnActorObject,
    });

    if (!actor) throw new NotFoundException('Actor not found');

    return actor;
  }

  async create() {
    const actor = await this.prisma.actor.create({
      data: {
        name: '',
        slug: uuidv4(),
      },
    });

    return actor.id;
  }

  async update(id: number, dto: CreateActorDto) {
    // if (dto.slug) {
    //   const oldActor = await this.prisma.actor.findUnique({
    //     where: { slug: dto.slug },
    //   });
    //
    //   // if (oldActor) throw new BadRequestException('Actor already exists');
    // }

    const actor = await this.getById(id);

    // const newActorPhoto = await this.

    // console.log(dto.movies);
    //
    // console.log(actor.photos);

    for (const photo of actor.photos) {
      for (const item of dto.photos) {
        if (item === photo.id && actor.slug === dto.slug) {
          // console.log('ok');
          throw new BadRequestException('Actor already exists');
        }
      }
    }

    const updatedActor = await this.prisma.actor.update({
      where: { id },
      data: {
        ...dto,
        slug: dto.slug.length ? dto.slug : actor.slug,
        photos: {
          set: [],
          connect: dto.photos?.map(id => ({ id })),
        },
        movies: {
          set: [],
          connect: dto.movies?.map(id => ({ id })),
        },
      },
      select: returnActorObject,
    });

    // console.log('updatedActor', updatedActor);

    return updatedActor;
  }

  async delete(id: number) {
    return this.prisma.actor.delete({
      where: { id },
    });
  }

  async updateCountMovies() {
    const actors = await this.prisma.actor.findMany({
      select: {
        movies: true,
        id: true,
      },
    });

    actors.forEach(async actor => {
      await this.prisma.actor.update({
        where: { id: actor.id },
        data: {
          countMovies: actor.movies.length,
        },
      });
    });
  }
}
