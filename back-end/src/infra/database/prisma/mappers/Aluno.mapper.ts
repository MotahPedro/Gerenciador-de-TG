import { AlunoOrientadoProps } from "@domain/entities/AlunoOrientado";

export class AlunoMapper {
    static toPrisma (aluno: Partial<AlunoOrientadoProps>): any {
        return {
            matricula: aluno.matricula,
            nome: aluno.nome,
            email: aluno.email,
            senha: aluno.senha,
            curso: aluno.curso ?? "",
            turma: aluno.turma,
            periodo: aluno.periodo ?? "",
            semestre: aluno.semestre ?? "",
            filaDependencia: aluno.filaDependencia ?? false,
            professorOrientadorCpf: aluno.professorOrientadorCpf ?? "",
            cargo: aluno.cargo ?? 'Aluno',
            trabalhos: Array.isArray(aluno.trabalhos) && aluno.trabalhos.length > 0 ? { create: aluno.trabalhos.map(t => ({ tema: t.tema, objetivo: t.objetivo, questaoProblema: t.questaoProblema })) } : undefined
        }
    }

    static toDomain(raw: any): AlunoOrientadoProps {
        return {
            matricula: raw.matricula,
            nome: raw.nome,
            email: raw.email,
            senha: raw.senha,
            curso: raw.curso,
            turma: raw.turma,
            periodo: raw.periodo,
            semestre: raw.semestre,
            filaDependencia: raw.filaDependencia,
            professorOrientadorCpf: raw.professorOrientadorCpf,
            cargo: raw.cargo,
            trabalhos: Array.isArray(raw.trabalhos) ? raw.trabalhos.map(t => ({ tema: t.tema, objetivo: t.objetivo, questaoProblema: t.questaoProblema })) : []
        }
    }

    static toGET(raw: any): any {
        return {
            matricula: raw.matricula,
            nome: raw.nome,
            email: raw.email,
            senha: raw.senha,
            curso: raw.curso,
            turma: raw.turma,
            periodo: raw.periodo,
            semestre: raw.semestre,
            filaDependencia: raw.filaDependencia,
            professorOrientadorCpf: raw.professorOrientadorCpf,
            cargo: raw.cargo,
            trabalhos: Array.isArray(raw.trabalhos) ? raw.trabalhos.map(t => ({ tema: t.tema, objetivo: t.objetivo, questaoProblema: t.questaoProblema })) : []
        }
    }
}