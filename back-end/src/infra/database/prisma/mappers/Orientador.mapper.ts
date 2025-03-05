import { ProfessorOrientadorProps } from "@domain/entities/ProfessorOrientador";

export class OrientadorMapper {
    static toPrisma(orientador: Partial<ProfessorOrientadorProps>): any {
        return {
            cpf: orientador.cpf,
            nome: orientador.nome,
            email: orientador.email,
            senha: orientador.senha,
            linhasOrientacao: orientador.linhasOrientacao ? { create: orientador.linhasOrientacao.map(linha => ({ linha })) } : undefined,
            cursosAtuacao: orientador.cursosAtuacao ? { create: orientador.cursosAtuacao.map(curso => ({ curso })) } : undefined,
            alunosOrientados: orientador.alunosOrientados ? { create: orientador.alunosOrientados.map(aluno => ({ nome: aluno })) } : undefined,
            quantidadeInstituicoes: orientador.quantidadeInstituicoes ?? 0,
            quantidadeAlunos: orientador.quantidadeAlunos ?? 0,
        }
    }

    static toDomain(raw: any): ProfessorOrientadorProps {
        return {
            id: raw.id,
            cpf: raw.cpf,
            nome: raw.nome,
            email: raw.email,
            senha: raw.senha,
            linhasOrientacao: Array.isArray(raw.linhasOrientacao) ? raw.linhasOrientacao.map(linha => linha.linha) : [],
            quantidadeInstituicoes: raw.quantidadeInstituicoes,
            cursosAtuacao: Array.isArray(raw.cursosAtuacao) ? raw.cursosAtuacao.map(curso => curso.curso) : [],
            quantidadeAlunos: raw.quantidadeAlunos,
            alunosOrientados: Array.isArray(raw.alunosOrientados) ? raw.alunosOrientados.map(aluno => aluno.nome) : [],
        };
    }

    static toGET(raw: any): any {
        return {
            id: raw.id,
            cpf: raw.cpf,
            nome: raw.nome,
            email: raw.email,
            senha: raw.senha,
            linhasOrientacao: Array.isArray(raw.linhasOrientacao) ? raw.linhasOrientacao.map(linha => linha.linha) : [],
            quantidadeInstituicoes: raw.quantidadeInstituicoes,
            cursosAtuacao: Array.isArray(raw.cursosAtuacao) ? raw.cursosAtuacao.map(curso => curso.curso) : [],
            quantidadeAlunos: raw.quantidadeAlunos,
            alunosOrientados: Array.isArray(raw.alunosOrientados) ? raw.alunosOrientados.map(aluno => aluno.nome) : [],
        };
    }

    static compare(request, raw): boolean {
        const current = this.toDomain(raw);
        return JSON.stringify(current) === JSON.stringify(request);
    }
}
