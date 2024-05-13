import { UsePipes, ValidationPipe, applyDecorators } from '@nestjs/common'

export const Validate = () => applyDecorators(UsePipes(new ValidationPipe()))
