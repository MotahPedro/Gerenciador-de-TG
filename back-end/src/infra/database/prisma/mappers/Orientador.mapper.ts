import { ProfessorOrientadorProps } from "@domain/entities/ProfessorOrientador";

export class OrientadorMapper {
    static toPrisma(orientador: Partial<ProfessorOrientadorProps>): any {
        return {
            cpf: orientador.cpf,
            nome: orientador.nome,
            email: orientador.email,
            senha: orientador.senha,
            cargo: orientador.cargo ?? 'Orientador',
            
            linhasOrientacao: orientador.linhasOrientacao ?? [],
            cursosAtuacao: orientador.cursosAtuacao ?? [],
            alunosOrientados: orientador.alunosOrientados ?? [],
            
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
        cargo: raw.cargo ?? 'Orientador',
        linhasOrientacao: Array.isArray(raw.linhasOrientacao) ? raw.linhasOrientacao.map(linha => linha.linha) : [],
        quantidadeInstituicoes: raw.quantidadeInstituicoes,
        cursosAtuacao: Array.isArray(raw.cursosAtuacao) ? raw.cursosAtuacao.map(curso => curso.curso) : [],
        quantidadeAlunos: raw.quantidadeAlunos,
        alunosOrientados: Array.isArray(raw.alunosOrientados) ? raw.alunosOrientados.map(aluno => ({
            matricula: aluno.matricula,
            nome: aluno.nome,
            email: aluno.email,
            curso: aluno.curso,
            turma: aluno.turma,
            periodo: aluno.periodo,
            semestre: aluno.semestre,
            filaDependencia: aluno.filaDependencia,
            trabalhos: Array.isArray(aluno.trabalhos) ? aluno.trabalhos.map(trabalho => ({
                tema: trabalho.tema,
                objetivo: trabalho.objetivo,
                questaoProblema: trabalho.questaoProblema,
            })) : [],
        })) : [],
    };
}


    static toGET(raw: any): any {
    return {
        id: raw.id,
        cpf: raw.cpf,
        nome: raw.nome,
        email: raw.email,
        senha: raw.senha,
        cargo: raw.cargo ?? 'Orientador',
        linhasOrientacao: Array.isArray(raw.linhasOrientacao) ? raw.linhasOrientacao.map(linha => linha.linha) : [],
        quantidadeInstituicoes: raw.quantidadeInstituicoes,
        cursosAtuacao: Array.isArray(raw.cursosAtuacao) ? raw.cursosAtuacao.map(curso => curso.curso) : [],
        quantidadeAlunos: raw.quantidadeAlunos,
        alunosOrientados: Array.isArray(raw.alunosOrientados) ? raw.alunosOrientados.map(aluno => ({
            matricula: aluno.matricula,
            nome: aluno.nome,
            email: aluno.email,
            curso: aluno.curso,
            turma: aluno.turma,
            periodo: aluno.periodo,
            semestre: aluno.semestre,
            filaDependencia: aluno.filaDependencia,
            trabalhos: Array.isArray(aluno.trabalhos) ? aluno.trabalhos.map(trabalho => ({
                tema: trabalho.tema,
                objetivo: trabalho.objetivo,
                questaoProblema: trabalho.questaoProblema,
            })) : [],
        })) : [],
    };
}


    static compare(request, raw): boolean {
        const current = this.toDomain(raw);
        return JSON.stringify(current) === JSON.stringify(request);
    }
}
