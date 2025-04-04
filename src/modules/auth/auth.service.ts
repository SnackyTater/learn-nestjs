import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, SignupDto, CreateOtpDto, VerifyOtpDto } from 'src/models/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createToken } from 'src/utils/auth';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prisma: PrismaService
  ){}

  async createOtp(payload: CreateOtpDto): Promise<string>{
    const account = payload['email'];
    const iat = Date.now();
    const exp = (Date.now() + 30 * 60 * 1000);
    
    const otp = await Promise.resolve('123123');
    await this.prisma.otp.upsert({
      where: { account },
      update: { otp, iat, exp },
      create: { account, otp, iat, exp },
    });

    return otp
  }

  async verifyOtp(payload: VerifyOtpDto): Promise<string>{
    const result = await this.prisma.otp.findFirst({
      where: { account: payload['email'] }
    });

    if(!result) return 'invalid OTP';

    //if otp is expire then break out
    const now = Date.now();
    if(Number(result.exp) > now) return 'OTP is expired, please issue a new one';

    //check otp value
    if(payload['otp'] != result.otp) return 'invalid OTP';

    return '';
  }

  async createAccount(payload: SignupDto): Promise<any>{
    const account = await this.prisma.account.create({
      data: {...payload}
    })
    return account
  }

  async createLoginSession(payload: LoginDto, userAgent: string, ip: string): Promise<string> {
    const user = await this.prisma.account.findFirst({
      where: {
        OR: [ 
          { email: payload['username'] },
          { phone: payload['username'] }
        ],
        AND: { password: payload['password'] }
      }
    })

    if(!user) throw new UnauthorizedException('incorrect username or password')

    //create token info
    const tokenPayload = {};
    tokenPayload['user'] = payload['username'];
    tokenPayload['iat'] = Date.now();
    tokenPayload['exp'] = Date.now() + 5 * 60 * 1000;
    const token = createToken(tokenPayload);

    //save token to cache 
    const cacheKey = `${userAgent}|${ip}`;
    this.cacheManager.set(cacheKey, token);

    return token;
  }
}
