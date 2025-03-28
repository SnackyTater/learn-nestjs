import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache){}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    
    if(!token) return false;

    const userAgent = request.headers['user-agent'];
    const ip = request.ip;
    const key = `${userAgent}|${ip}`;

    const storedToken = await this.cacheManager.get(key);
    
    if(token !== storedToken) return false;

    return true;
  }
}