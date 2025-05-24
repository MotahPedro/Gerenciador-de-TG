import { ApiProperty } from '@nestjs/swagger';

export class OrientadorRequestDto {
  @ApiProperty({ example: '123.456.789-00' })
  cpf: string;

  @ApiProperty({ example: 'João Silva' })
  nome: string;

  @ApiProperty({ example: 'joao.silva@example.com'})
  email: string;

  @ApiProperty({ example: '123456789'})
  senha: string;

  @ApiProperty({ example: [ 'Linha 1', 'Linha 2'] })
  linhasOrientacao: string[];

  @ApiProperty({ example: 3 })
  quantidadeInstituicoes: number;

  @ApiProperty({ type: [Object], example: [{ curso: 'Curso 1' }, { curso: 'Curso 2' }] })
  cursosAtuacao: { curso: string }[];

  @ApiProperty({ example: 10 })
  quantidadeAlunos: number;

  @ApiProperty({ example: 'Orientador' })
  cargo?: string;

  @ApiProperty({ example: '1232142141' })
  alunosOrientados: string[]; // Array de RAs de alunos orientados
}
