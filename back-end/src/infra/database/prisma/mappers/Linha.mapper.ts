import { LinhaProps } from "@domain/entities/LinhaOrientacao"

export class LinhaMapper {
    static toPrisma (linha: Partial<LinhaProps>): any {
        return {
            linha: linha.linha,
            orientadoresCpfs: linha.orientadoresCpfs ?? [],
        }
    }

    static toDomain(raw: any): LinhaProps {
        return {
            linha: raw.linha,
            orientadoresCpfs: raw.orientadoresCpfs ?? undefined,
        }
    }

    static toGET(raw: any): LinhaProps {
        return {
            linha: raw.linha,
            orientadoresCpfs: raw.orientadoresCpfs ?? undefined,
        }
    }
}