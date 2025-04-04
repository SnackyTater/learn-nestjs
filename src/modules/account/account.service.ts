import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountRequest } from './dto/create-account.dto';
import { extractTokenInfo } from 'src/utils/auth';
import { CreateOtpDtoRequest } from './dto/create-otp.dto';
import { VerifyOtpDtoRequest } from './dto/verify-otp.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async createAccount(payload: CreateAccountRequest) {
    const id = payload.id;
    const updatedInfo = {
      username: payload.username,
      phone: payload.phone,
      email: payload.email
    };

    const result = await this.prisma.account.update({
      where: { id },
      data: updatedInfo
    })

    return result;
  }

  async getAccountInfo(token: string) {
    const tokenInfo = extractTokenInfo(token);


  }

  async updateAccountInfo() { }

  async deleteAccount() { }

  async updatePassword() { }

  async createForgotPasswordOtp(payload: CreateOtpDtoRequest): Promise<boolean> {
    try {
      const account = payload['email'];
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const exp = Date.now() + 5 * 60 * 1000; // 5 minutes expiration time
      const iat = Date.now();

      await this.prisma.otp.upsert({
        where: { account },
        update: { otp, iat, exp },
        create: { account, otp, iat, exp },
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async verifyForgotPasswordOtp(payload: VerifyOtpDtoRequest): Promise<boolean> { 
    try {
      const result = await this.prisma.otp.findFirst({
        where: { account: payload['email'] }
      });

      if (!result) return false;

      //if otp is expire then break out
      const now = Date.now();
      if (Number(result.exp) < now) return false;

      //check otp value
      if (payload['otp'] != result.otp) return false;

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
