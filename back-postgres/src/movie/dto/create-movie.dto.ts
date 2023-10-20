import { Actor, Genre, Prisma } from '@prisma/client';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateMovieDto {
  @IsOptional()
  @IsString({
    message: 'Title should be a string',
  })
  title: string;

  @IsOptional()
  @IsString({
    message: 'Slug should be a string',
  })
  slug: string;

  @IsOptional()
  @IsString({
    message: 'Description should be a string',
  })
  description: string;

  @IsOptional()
  @IsArray({
    message: 'Posters should be an array of numbers',
  })
  posters: number[];
  @IsOptional()
  @IsArray({
    message: 'BigPosters should be an array of numbers',
  })
  bigPosters: number[];
  @IsOptional()
  @IsArray({
    message: 'Videos should be an array of numbers',
  })
  videos: number[];
  @IsOptional()
  @IsArray({
    message: 'Genres should be an array of numbers',
  })
  genres: number[];

  @IsOptional()
  @IsArray({
    message: 'Actors should be an array of numbers',
  })
  actors: number[];

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsOptional()
  @IsString({
    message: 'Country should be a string',
  })
  country: string;
}
