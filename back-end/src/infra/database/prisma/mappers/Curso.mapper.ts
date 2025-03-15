import { CursoProps } from "@domain/entities/CursoProps"

export class CursoMapper {
    static toPrisma (curso: Partial<CursoProps>): any {
        return {
            curso: curso.curso,
            professorOrientadorCpf: curso.professorOrientadorCpf ?? undefined,
            cpfs: curso.cpfs ?? [],
        }
    }

    static toDomain(raw: any): CursoProps {
        return {
            curso: raw.curso,
            professorOrientadorCpf: raw.professorOrientadorCpf ?? undefined,
            cpfs: raw.cpfs ?? undefined,
        }
    }

    static toGET(raw: any): CursoProps {
        return {
            curso: raw.curso,
            professorOrientadorCpf: raw.professorOrientadorCpf ?? undefined,
            cpfs: raw.cpfs ?? undefined,
        }
    }
}