import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToInstance(metadata.metatype as any, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const formattedErrors = errors.reduce((acc, error) => {
        console.log('aaaa', error.constraints)
        //take first error message;
        acc[error.property] = Object.values(error.constraints as any)[0];
        return acc;
      }, {});

      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }

    return value;
  }
}