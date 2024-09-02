export interface ProfessorOrientadorProps {
  id?: number;
  cpf: string;
  nome: string;
  email: string;
  linhasOrientacao: { linha: string }[]; // Atualizado para refletir a estrutura usada no toPrisma
  quantidadeInstituicoes: number;
  cursosAtuacao: { curso: string }[]; // Atualizado para refletir a estrutura usada no toPrisma
  quantidadeAlunos: number;
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
  }[]; // Atualizado para refletir a estrutura usada no toPrisma
}
