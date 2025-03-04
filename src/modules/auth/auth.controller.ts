import { Body, Controller, Get, HttpCode, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';

import { IdOnly, SampleBody, SampleDto } from 'src/models/dto/sample.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(){
    
  }

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Get('request')
  getRequestInfo(@Req() request: Request): any {
    console.log('request info', request);
    return request.headers;
  }

  @Get('query-single')
  getQuery(@Query('id') id: string): string {
    return `your id in query is ${id}`;
  }

  @Get('query-multiple')
  getQueries(@Query('id') id: string, @Query('page') page: number): string {
    return `you want to select page ${page} from id ${id}`;
  }

  @Get('param/:id')
  getParamId(@Param() param: IdOnly): string {
    return `passed id are ${param.id}`;
  }

  @Post()
  @HttpCode(204)
  createSample(@Body() body: SampleBody): string {
    console.log('body', body);
    return 'create success';
  }

  @Get('single/:id')
  getSingleSample(@Param('id') id: string): SampleDto | undefined {
    return this.authService.getCertainSample(Number.parseInt(id));
  }

  @Get('all')
  getAllSample(): SampleDto[] {
    return this.authService.getAllSamples();
  }

  @Post('create')
  addSample(@Body() body: SampleDto) {
    this.authService.addSample(body);
    return 'add successfully'
  }
}