import { ProfessorOrientadorProps } from "@domain/entities/ProfessorOrientador";

export abstract class OrientadorRepository {
  abstract save(orientador: ProfessorOrientadorProps): Promise<any>;
  abstract findByCpf(cpf: string): Promise<void>;
  abstract deleteByCpf(cpf: string): Promise<void>;
}
