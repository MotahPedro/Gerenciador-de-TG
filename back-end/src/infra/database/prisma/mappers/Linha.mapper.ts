import { LinhaProps } from "@domain/entities/LinhaOrientacao"

export class LinhaMapper {
    static toPrisma (linha: Partial<LinhaProps>): any {
        return {
            linha: linha.linha,
            professorOrientadorCpf: linha.professorOrientadorCpf ?? undefined,
            cpfs: linha.cpfs ?? [],
        }
    }

    static toDomain(raw: any): LinhaProps {
        return {
            linha: raw.linha,
            professorOrientadorCpf: raw.professorOrientadorCpf ?? undefined,
            cpfs: raw.cpfs ?? undefined,
        }
    }

    static toGET(raw: any): LinhaProps {
        return {
            linha: raw.linha,
            professorOrientadorCpf: raw.professorOrientadorCpf ?? undefined,
            cpfs: raw.cpfs ?? undefined,
        }
    }
}