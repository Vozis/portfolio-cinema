import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateGenreDto implements Prisma.GenreUpdateInput {
  @IsString({
    message: 'The name is required and cannot be empty',
  })
  name: string;

  @IsString({
    message: 'The slug is required and cannot be empty',
  })
  slug: string;

  @IsString({
    message: 'The description is required and cannot be empty',
  })
  description: string;

  @IsString({
    message: 'The icon is required and cannot be empty',
  })
  icon: string;
}
