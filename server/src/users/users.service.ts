import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'argon2';
import { returnUserObject } from './return-user.object';
import { returnMoviesObject } from '../movie/return-movies.object';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getCount() {
    return this.prisma.user.count();
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: await argon2.hash(dto.password),
        isAdmin: dto.isAdmin,
        roles: dto.role,
      },
    });
  }

  async findByPayload(key: keyof User, value: any): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        [key]: value,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: returnUserObject,
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async getAllUsers(searchTerm?: string) {
    const prismaSearchFilter: Prisma.UserWhereInput = searchTerm
      ? {
          OR: [
            {
              email: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    return this.prisma.user.findMany({
      where: prismaSearchFilter,
      include: {
        favorites: {
          select: {
            title: true,
          },
        },
        ratings: {
          select: {
            movie: {
              select: {
                title: true,
              },
            },
            value: true,
          },
        },
      },
    });
  }

  async updateProfile(id: number, dto: UpdateUserDto) {
    if (dto.email) {
      const isSameUser = await this.findByEmail(dto.email);

      if (isSameUser && id !== isSameUser.id) {
        throw new BadRequestException('Email already exists');
      }
    }
    const user = await this.findById(id);

    return this.prisma.user.update({
      where: { id },
      data: {
        ...dto,
        password: dto.password ? await hash(dto.password) : user.password,
        isAdmin:
          dto.isAdmin || dto.isAdmin === false ? dto.isAdmin : user.isAdmin,
      },
      include: {
        favorites: true,
      },
    });
  }

  async getFavorites(id: number) {
    return this.prisma.user
      .findUnique({
        where: { id },
        select: {
          favorites: {
            select: returnMoviesObject,
          },
        },
      })
      .then(data => data.favorites);
  }

  async toggleFavorites(id: number, movieId: number) {
    const isExist = await this.prisma.user
      .count({
        where: {
          id,
          favorites: {
            some: {
              id: movieId,
            },
          },
        },
      })
      .then(Boolean);

    return this.prisma.user.update({
      where: { id },
      data: {
        favorites: {
          [isExist ? 'disconnect' : 'connect']: {
            id: movieId,
          },
        },
      },
      include: {
        favorites: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    const user = await this.findById(id);

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
