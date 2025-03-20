import { ApiProperty } from '@nestjs/swagger';

export class CursoRequestDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Analise e Desenvolvimento de Software' })
  curso: string;

  @ApiProperty({ example: '123456789012'})
  professorOrientadorCpf: string;

  @ApiProperty({ example: ['123456789012', '321321421512'] })
  cpfs: string[];
}