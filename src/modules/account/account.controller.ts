import { Controller } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guards';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
}