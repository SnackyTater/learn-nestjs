import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumberString()
  phone: string;
}
