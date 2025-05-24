import * as bcrypt from 'bcrypt';

export class AlunoOrientadoProps {
  id?: number;
  matricula: string;
  nome: string;
  email: string;
  senha: string;
  curso?: string;
  turma: string;
  periodo: string;
  semestre: string;
  filaDependencia: boolean;
  professorOrientadorCpf?: string;
  cargo?: string;
  trabalhos: {
    tema: string;
    objetivo: string;
    questaoProblema: string;
  }[];

    static async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
      return bcrypt.compare(plainPassword, hashedPassword);
    }
}

export class AdminLoginProps {
  email: string;
  senha: string;
  chave: string;
}