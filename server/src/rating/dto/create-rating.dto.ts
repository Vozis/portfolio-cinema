import { IsNumber, isNumber, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  movieId: number;

  @IsNumber()
  value: number;
}
