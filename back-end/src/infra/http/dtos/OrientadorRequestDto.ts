import { ApiProperty } from '@nestjs/swagger';

export class OrientadorRequestDto {
  @ApiProperty({ example: '123.456.789-00' })
  cpf: string;

  @ApiProperty({ example: 'João Silva' })
  nome: string;

  @ApiProperty({ example: 'joao.silva@example.com'})
  email: string;

  @ApiProperty({ type: [Object], example: [{ linha: 'Linha 1' }, { linha: 'Linha 2' }] })
  linhasOrientacao: { linha: string }[];

  @ApiProperty({ example: 3 })
  quantidadeInstituicoes: number;

  @ApiProperty({ type: [Object], example: [{ curso: 'Curso 1' }, { curso: 'Curso 2' }] })
  cursosAtuacao: { curso: string }[];

  @ApiProperty({ example: 10 })
  quantidadeAlunos: number;

  @ApiProperty({
    type: [Object],
    example: [
      {
        matricula: '12345',
        nome: 'Aluno 1',
        email: 'aluno1@example.com',
        curso: 'Curso 1',
        turma: 'Turma A',
        periodo: 'Período 1',
        semestre: 'Semestre 1',
        filaDependencia: 'Nenhuma',
        trabalhos: [
          {
            tema: 'Tema 1',
            objetivo: 'Objetivo 1',
            questaoProblema: 'Questão 1',
          },
        ],
      },
      {
        matricula: '67890',
        nome: 'Aluno 2',
        email: 'aluno2@example.com',
        curso: 'Curso 2',
        turma: 'Turma B',
        periodo: 'Período 2',
        semestre: 'Semestre 2',
        filaDependencia: 'Nenhuma',
        trabalhos: [
          {
            tema: 'Tema 2',
            objetivo: 'Objetivo 2',
            questaoProblema: 'Questão 2',
          },
        ],
      },
    ],
  })
  alunosOrientados: {
    matricula: string;
    nome: string;
    email: string;
    curso: string;
    turma: string;
    periodo: string;
    semestre: string;
    filaDependencia: string;
    trabalhos: {
      tema: string;
      objetivo: string;
      questaoProblema: string;
    }[];
  }[];
}
