import { Body, Controller, Get, HttpCode, Param, Post, Query, Req, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';

import { SampleService } from './sample.service';

import { CreateSampleDto } from 'src/models/dto/createSample.dto';
import { IdOnly, SampleBody, SampleDto } from 'src/models/dto/sample.dto';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get()
  getHello(): string {
    return this.sampleService.getHello();
  }

  @Get('request')
  getRequestInfo(@Req() request: Request): any {
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
  createSample(@Body(ValidationPipe) body: CreateSampleDto): string {
    return this.sampleService.addSample(body);
  }

  @Get('single/:id')
  getSingleSample(@Param('id') id: string): SampleDto | undefined {
    return this.sampleService.getCertainSample(Number.parseInt(id));
  }

  @Get('all')
  getAllSample(): SampleDto[] {
    return this.sampleService.getAllSamples();
  }

  @Post('create')
  addSample(@Body() body: SampleDto) {
    this.sampleService.addSample(body); 
    return 'add successfully'
  }
}