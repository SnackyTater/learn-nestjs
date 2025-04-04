import { IsEmail, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class UpdateAccountRequest {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumberString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UpdateAccountResponse {
  username: string;
  phone: string;
  email: string;
}