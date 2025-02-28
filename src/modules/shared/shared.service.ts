import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  getSharedMesssage(): string {
    return 'Hello World!';
  }
}
