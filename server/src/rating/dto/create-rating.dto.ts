import { IsNumber } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  movieId: number;

  @IsNumber()
  value: number;
}
