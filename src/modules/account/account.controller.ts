import { Body, Controller, Delete, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/commons/guards/auth.guards';
import { AccountService } from './account.service';
import { CreateAccountRequest } from './dto/create-account.dto';
import { CreateOtpDtoRequest, CreateOtpDtoResponse } from './dto/create-otp.dto';
import { UpdateAccountRequest } from './dto/update-account.dto';
import { VerifyOtpDtoRequest, VerifyOtpDtoResponse } from './dto/verify-otp.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('create')
  async createAccount(@Body(ValidationPipe) body: CreateAccountRequest){
    const response = await this.accountService.createAccount(body);
    return response;
  }

  @Post('create-otp')
  async createOTP(@Body(ValidationPipe) body: CreateOtpDtoRequest): Promise<CreateOtpDtoResponse>{
    const success = await this.accountService.createForgotPasswordOtp(body);
    return { success };
  }

  @Post('verify-otp')
  async verifyOTP(@Body(ValidationPipe) body: VerifyOtpDtoRequest): Promise<VerifyOtpDtoResponse>{
    const success = await this.accountService.verifyForgotPasswordOtp(body);
    return { success };
  }

  @Post('edit')
  @UseGuards(AuthGuard)
  async editAccountInfo(@Body(ValidationPipe) body: UpdateAccountRequest){}

  @Get('get')
  @UseGuards(AuthGuard)
  async getAccountInfo(){}

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteAccount(){}
}