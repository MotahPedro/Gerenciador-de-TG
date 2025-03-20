import { ApiProperty } from '@nestjs/swagger';

export class CursoResponsetDto {
  @ApiProperty({ example: 'Analise e Desenvolvimento de Software' })
  curso: string;

  @ApiProperty({ example: '123456789012' })
  professorOrientadorCpf: string;

  @ApiProperty({ example: ['123456789012', '321321421512'] })
  cpfs: string[];
}