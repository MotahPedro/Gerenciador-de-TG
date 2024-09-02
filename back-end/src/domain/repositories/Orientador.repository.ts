import { ProfessorOrientadorProps } from "@domain/entities/ProfessorOrientador";

export abstract class OrientadorRepository {
  abstract save(reservation: ProfessorOrientadorProps): Promise<any>;
  // abstract update(id: string): Promise<void>;
  // abstract findByOrientadorId(Orientadorid: string);
}
