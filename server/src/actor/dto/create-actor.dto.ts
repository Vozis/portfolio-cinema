import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateActorDto {
  @IsOptional()
  @IsString({
    message: 'Name should be a string',
  })
  name: string;

  @IsOptional()
  @IsString({
    message: 'Slug should be a string',
  })
  slug: string;

  @IsOptional()
  @IsArray({
    message: 'Photos should be an array of numbers',
  })
  photos: number[];

  @IsOptional()
  @IsNumber()
  countMovies: number;

  @IsOptional()
  @IsArray({
    message: 'Photos should be an array of numbers',
  })
  movies: number[];
}
