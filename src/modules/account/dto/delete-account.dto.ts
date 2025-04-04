import { IsNotEmpty, IsString } from "class-validator";

export class DeleteAccountRequest {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class DeleteAccountResponse {
  success: boolean;
  message: string;
}