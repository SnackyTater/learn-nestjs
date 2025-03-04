import { Injectable } from '@nestjs/common';
import { CreateSampleDto } from 'src/models/dto/createSample.dto';
import { SampleInterface } from 'src/models/interface/sample.interface';

@Injectable()
export class SampleService {
  // constructor(private readonly prisma: PrismaService) {}

  private readonly sampleList: SampleInterface[] = [];

  // async addSample(data: CreateSampleDto): Promise<Sample> {
  //   return this.prisma.sample.create({ data });
  // }

  addSample(data: CreateSampleDto) {
    throw new Error('aaaa')
    return `sample with the name ${data.name} is created`;
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
