import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateOtpDtoRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class CreateOtpDtoResponse {
  success: boolean;
}
