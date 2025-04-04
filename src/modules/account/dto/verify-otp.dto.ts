import { IsEmail, IsNotEmpty, IsNumberString } from "class-validator";

export class VerifyOtpDtoRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsNumberString()
  otp: string;
}

export class VerifyOtpDtoResponse {
  success: boolean;
}