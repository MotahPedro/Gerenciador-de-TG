export interface ProfessorOrientadorProps {
  id?: number;
  cpf: string;
  nome: string;
  email: string;
  linhasOrientacao: string[];
  quantidadeInstituicoes: number;
  cursosAtuacao: string[];
  quantidadeAlunos: number;
  alunosOrientados: string[];
}