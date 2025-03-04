import { Injectable } from '@nestjs/common';
import { Sample } from '@prisma/client';
import { CreateSampleDto } from 'src/models/dto/sample.dto';
import { SampleInterface } from 'src/models/interface/sample.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SampleService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly sampleList: SampleInterface[] = [];

  async addSample(data: CreateSampleDto): Promise<Sample> {
    return this.prisma.sample.create({ data });
  }

  getCertainSample(id: number): SampleInterface | undefined {
    const result = this.sampleList.find(sample => sample.id === id);
    return result;
  }

  getAllSamples(): SampleInterface[] {
    return this.sampleList;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
