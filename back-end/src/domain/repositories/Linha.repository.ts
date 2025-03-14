import { LinhaProps } from "@domain/entities/LinhaOrientacao";

export abstract class LinhaRepository {
  abstract save(linha: LinhaProps): Promise<any>;
  abstract findById(id: number): Promise<LinhaProps>;
  abstract findByCpf(professorOrientadorCpf: string): Promise<LinhaProps>;
  abstract delete(id: number): Promise<void>;
  abstract update(id: number, linha: LinhaProps): Promise<void>;
  abstract addOrientadorCpf(id: number, orientadorCpf: string): Promise<void>;
  abstract findAll(): Promise<void>;
}