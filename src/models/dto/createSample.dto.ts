import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSampleDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}