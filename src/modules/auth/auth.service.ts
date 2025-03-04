import { Injectable } from '@nestjs/common';
import { SampleDto } from 'src/models/dto/sample.dto';
import { SampleInterface } from 'src/models/interface/sample.interface';

@Injectable()
export class AuthService {
  private readonly sampleList: SampleInterface[] = [];

  addSample(sample: SampleDto): void {
    this.sampleList.push(sample);
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
