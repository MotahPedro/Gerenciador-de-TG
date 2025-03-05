export interface ProfessorOrientadorProps {
  id?: number;
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  linhasOrientacao: string[];
  cursosAtuacao: string[];
  alunosOrientados: string[];
  quantidadeInstituicoes: number;
  quantidadeAlunos: number;
}

