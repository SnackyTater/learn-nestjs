import { IsNotEmpty, IsString } from "class-validator";

export class GetAccountRequest {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class GetAccountResponse {
  username: string;
  phone: string;
  email: string;
}