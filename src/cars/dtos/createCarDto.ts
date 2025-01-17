import { IsString } from 'class-validator';
import { carColor } from '../interfaces/carColor.union';

export class createCarDto {
  @IsString()
  name: string;
  color: carColor;
}
