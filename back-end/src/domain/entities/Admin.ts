import * as bcrypt from 'bcrypt';

export class AdminProps {
  id?: number;
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  cargo: string;
  chave: string;

  static async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export class AdminLoginProps {
  email: string;
  senha: string;
  chave: string;
}