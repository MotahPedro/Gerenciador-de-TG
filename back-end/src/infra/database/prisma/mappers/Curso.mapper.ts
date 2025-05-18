import { CursoProps } from "@domain/entities/CursoProps"

export class CursoMapper {
    static toPrisma(curso: Partial<CursoProps>): any {
        return {
            curso: curso.curso,
            orientadoresCpfs: curso.orientadoresCpfs ?? [],
            alunosMatriculas: curso.alunosMatriculas ?? [],
        }
    }

    static toDomain(raw: any): CursoProps {
        return {
            curso: raw.curso,
            orientadoresCpfs: raw.orientadoresCpfs ?? undefined,
            alunosMatriculas: raw.alunosMatriculas ?? undefined,
        }
    }

    static toGET(raw: any): CursoProps {
        return {
            curso: raw.curso,
            orientadoresCpfs: raw.orientadoresCpfs ?? undefined,
            alunosMatriculas: raw.alunosMatriculas ?? undefined,
        }
    }
}