import { TrabalhoProps } from "@domain/entities/Trabalhos";

export class TrabalhoMapper {
    static toPrisma (trabalho: TrabalhoProps): any {
        return {
            tema: trabalho.tema,
            objetivo: trabalho.objetivo,
            questaoProblema: trabalho.questaoProblema
        }
    }

    static toDomain(raw: any): TrabalhoProps {
        return {
            tema: raw.tema,
            objetivo: raw.objetivo,
            questaoProblema: raw.questaoProblema
        }
    }

    static toGET(raw: any): any {
        return {
            tema: raw.tema,
            objetivo: raw.objetivo,
            questaoProblema: raw.questaoProblema
        }
    }
}