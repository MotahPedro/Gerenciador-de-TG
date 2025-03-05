import { ApiProperty } from '@nestjs/swagger';

export class LinhaRequestDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Desenvolvimento de Software' })
  linha: string;

  @ApiProperty({ example: ['123456789012', '321321421512'] })
  professorOrientadorCpf: string[];
}