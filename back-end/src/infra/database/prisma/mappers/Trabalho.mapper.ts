import { TrabalhoProps } from "@domain/entities/Trabalhos";

export class TrabalhoMapper {
    static toPrisma (trabalho: Partial<TrabalhoProps>): any {
        return {
            tema: trabalho.tema,
            objetivo: trabalho.objetivo,
            questaoProblema: trabalho.questaoProblema,
            alunoOrientadoId: trabalho.alunoOrientadoId
        }
    }

    static toDomain(raw: any): TrabalhoProps {
        return {
            tema: raw.tema,
            objetivo: raw.objetivo,
            questaoProblema: raw.questaoProblema,
            alunoOrientadoId: raw.alunoOrientadoId
        }
    }

    static toGET(raw: any): any {
        return {
            tema: raw.tema,
            objetivo: raw.objetivo,
            questaoProblema: raw.questaoProblema,
            alunoOrientadoId: raw.alunoOrientadoId
        }
    }
}