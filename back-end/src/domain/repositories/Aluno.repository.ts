import { AlunoOrientadoProps } from "@domain/entities/AlunoOrientado";

export abstract class AlunoRepository {
  abstract save(orientador: AlunoOrientadoProps): Promise<any>;
  abstract findByRa(matricula: string): Promise<void>;
  abstract deleteByRa(matricula: string): Promise<void>;
  abstract update(matricula: string, orientador: AlunoOrientadoProps): Promise<void>;
}
