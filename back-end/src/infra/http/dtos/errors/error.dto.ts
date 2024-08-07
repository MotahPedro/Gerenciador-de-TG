import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  reason: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  status: string;
}
