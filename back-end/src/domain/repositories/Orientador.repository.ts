import { ProfessorOrientadorProps } from "@domain/entities/ProfessorOrientador";

export abstract class OrientadorRepository {
  abstract save(orientador: ProfessorOrientadorProps): Promise<any>;
  abstract findByCpf(cpf: string);
  // abstract update(id: string): Promise<void>;
  // abstract findByOrientadorId(Orientadorid: string);
}
