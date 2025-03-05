import { LinhaProps } from "@domain/entities/LinhaOrientação"

export class LinhaMapper {
    static toPrisma (linha: Partial<LinhaProps>): any {
        return {
            linha: linha.linha,
            professorOrientadorCpf: linha.professorOrientadorCpf ?? undefined,
        }
    }

    static toDomain(raw: any): LinhaProps {
        return {
            linha: raw.linha,
            professorOrientadorCpf: raw.professorOrientadorCpf ?? undefined,
        }
    }

    static toGET(raw: any): LinhaProps {
        return {
            linha: raw.linha,
            professorOrientadorCpf: raw.professorOrientadorCpf ?? undefined,
        }
    }
}