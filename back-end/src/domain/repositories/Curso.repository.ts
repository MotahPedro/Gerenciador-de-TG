import { CursoProps } from "@domain/entities/CursoProps";

export abstract class CursoRepository {
  abstract save(curso: CursoProps): Promise<any>;
  abstract findById(id: number): Promise<CursoProps>;
  abstract findByOrientadorCpf(professorOrientadorCpf: string): Promise<CursoProps>;
  abstract delete(id: number): Promise<void>;
  abstract update(id: number, curso: CursoProps): Promise<void>;
  abstract addOrientadorCpf(id: number, orientadorCpf: string): Promise<void>;
  abstract addAlunoMatricula(id: number, matricula: string): Promise<void>;
  abstract findAll(): Promise<void>;
}