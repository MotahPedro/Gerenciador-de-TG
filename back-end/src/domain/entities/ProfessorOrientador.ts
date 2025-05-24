import * as bcrypt from 'bcrypt';

export class ProfessorOrientadorProps {
  id?: number;
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  linhasOrientacao: string[]
  quantidadeInstituicoes: number;
  quantidadeAlunos: number;
  cargo?: string;
  cursosAtuacao: { curso: string }[];
  alunosOrientados: string[]; // Array de RAs de alunos orientados

  static async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export class AdminLoginProps {
  email: string;
  senha: string;
  chave: string;
}