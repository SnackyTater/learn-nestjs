import { Body, Controller, Ip, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guards';
import { LoginDto, SignupDto, CreateOtpDto, VerifyOtpDto } from 'src/models/dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) body: SignupDto){
    const account = await this.authService.createAccount(body);
    return account
  }

  @Post('create-otp')
  async createOTP(@Body(ValidationPipe) body: CreateOtpDto){
    const otp = await this.authService.createOtp(body);
    return otp 
  }

  @Post('verify-otp')
  async verifySignupOTP(@Body(ValidationPipe) body: VerifyOtpDto){
    const result = await this.authService.verifyOtp(body);
    return result;
  }

  @Post('login')
  async login(@Body(ValidationPipe) body: LoginDto, @Req() req: Request, @Ip() ip: string){
    const userAgent = req.headers['user-agent'] as string;
    const token = await this.authService.createLoginSession(body, userAgent, ip);
    return token;
  }

  @Post('validate')
  @UseGuards(AuthGuard)
  validate(): string{
    return '';
  }

  @Post('forgot-password')
  async createForgotPasswordOTP(){
    return ''
  }

  @Post('update-password')
  async updatePasswordWithOTP(){
    return ''
  }
}