import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePreferenceDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreatePreferencesDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({each: true})
  @ArrayMinSize(1)
  names: string[];
}