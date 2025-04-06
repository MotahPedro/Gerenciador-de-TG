import { ApiProperty } from '@nestjs/swagger';

export class LinhaResponsetDto {
  @ApiProperty({ example: 'Desenvolvimento de Software' })
  linha: string;

  @ApiProperty({ example: ['123456789012', '321321421512'] })
  orientadoresCpfs: string[];
}