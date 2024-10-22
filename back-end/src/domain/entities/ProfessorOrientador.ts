export interface ProfessorOrientadorProps {
  id?: number;
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  linhasOrientacao: { linha: string }[];
  quantidadeInstituicoes: number;
  cursosAtuacao: { curso: string }[];
  quantidadeAlunos: number;
  alunosOrientados: {
    matricula: string;
    nome: string;
    email: string;
    senha: string;
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
