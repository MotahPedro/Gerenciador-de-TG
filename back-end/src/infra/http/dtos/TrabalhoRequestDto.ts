import { ApiProperty } from '@nestjs/swagger';

export class TrabalhoRequestDto {
  @ApiProperty({ example: 'Desenvolvimento de Software' })
  tema: string;

  @ApiProperty({ example: 'Criar um sistema de gestão' })
  objetivo: string;

  @ApiProperty({ example: 'Como melhorar a eficiência do desenvolvimento de software?' })
  questaoProblema: string;
}