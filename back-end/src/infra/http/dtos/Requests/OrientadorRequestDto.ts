import { ApiProperty } from '@nestjs/swagger';

export class OrientadorRequestDto {
  @ApiProperty({ example: '123.456.789-00' })
  cpf: string;

  @ApiProperty({ example: 'João Silva' })
  nome: string;

  @ApiProperty({ example: 'joao.silva@example.com' })
  email: string;

  @ApiProperty({ example: '123456789' })
  senha: string;

  @ApiProperty({ type: [String], example: ['Linha 1', 'Linha 2'] })
  linhasOrientacao: string[];

  @ApiProperty({ example: 3 })
  quantidadeInstituicoes: number;

  @ApiProperty({ type: [String], example: ['Curso 1', 'Curso 2'] })
  cursosAtuacao: string[];

  @ApiProperty({ example: 10 })
  quantidadeAlunos: number;

  @ApiProperty({ type: [String], example: ['Aluno 1', 'Aluno 2'] })
  alunosOrientados: string[];
}
