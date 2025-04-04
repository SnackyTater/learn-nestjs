import { IsEmail, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateAccountRequest {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsNumberString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class CreateAccountResponse {
  id: string;
}