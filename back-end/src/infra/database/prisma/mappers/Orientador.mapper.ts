import { ProfessorOrientadorProps } from "@domain/entities/ProfessorOrientador";

export class OrientadorMapper {
    static toPrisma(orientador): any {
        return {
            cpf: orientador.cpf,
            nome: orientador.nome,
            email: orientador.email,
            quantidadeInstituicoes: orientador.quantidadeInstituicoes,
            quantidadeAlunos: orientador.quantidadeAlunos,
            linhasOrientacao: {
                create: orientador.linhasOrientacao.map(linha => ({
                    linha: linha
                })),
            },
            cursosAtuacao: {
                create: orientador.cursosAtuacao.map(curso => ({
                    curso: curso
                })),
            },
            alunosOrientados: {
                create: orientador.alunosOrientados.map(aluno => ({
                    matricula: aluno.matricula,
                    nome: aluno.nome,
                    email: aluno.email,
                    curso: aluno.curso,
                    turma: aluno.turma,
                    periodo: aluno.periodo,
                    semestre: aluno.semestre,
                    filaDependencia: aluno.filaDependencia,
                    trabalhos: {
                        create: aluno.trabalhos.map(trabalho => ({
                            tema: trabalho.tema,
                            objetivo: trabalho.objetivo,
                            questaoProblema: trabalho.questaoProblema,
                        })),
                    },
                })),
            },
        };
    }

    static toDomain(raw: any): ProfessorOrientadorProps {
        return {
            id: raw.id,
            cpf: raw.cpf,
            nome: raw.nome,
            email: raw.email,
            linhasOrientacao: raw.linhasOrientacao.map(linha => linha.linha),
            quantidadeInstituicoes: raw.quantidadeInstituicoes,
            cursosAtuacao: raw.cursosAtuacao.map(curso => curso.curso),
            quantidadeAlunos: raw.quantidadeAlunos,
            alunosOrientados: raw.alunosOrientados.map(aluno => ({
                matricula: aluno.matricula,
                nome: aluno.nome,
                email: aluno.email,
                curso: aluno.curso,
                turma: aluno.turma,
                periodo: aluno.periodo,
                semestre: aluno.semestre,
                filaDependencia: aluno.filaDependencia,
                trabalhos: aluno.trabalhos.map(trabalho => ({
                    tema: trabalho.tema,
                    objetivo: trabalho.objetivo,
                    questaoProblema: trabalho.questaoProblema,
                })),
            })),
        };
    }

    static toGET(raw): any {
        return {
            id: raw.id,
            cpf: raw.cpf,
            nome: raw.nome,
            email: raw.email,
            linhasOrientacao: raw.linhasOrientacao.map(linha => linha.linha),
            quantidadeInstituicoes: raw.quantidadeInstituicoes,
            cursosAtuacao: raw.cursosAtuacao.map(curso => curso.curso),
            quantidadeAlunos: raw.quantidadeAlunos,
            alunosOrientados: raw.alunosOrientados.map(aluno => ({
                matricula: aluno.matricula,
                nome: aluno.nome,
                email: aluno.email,
                curso: aluno.curso,
                turma: aluno.turma,
                periodo: aluno.periodo,
                semestre: aluno.semestre,
                filaDependencia: aluno.filaDependencia,
                trabalhos: aluno.trabalhos.map(trabalho => ({
                    tema: trabalho.tema,
                    objetivo: trabalho.objetivo,
                    questaoProblema: trabalho.questaoProblema,
                })),
            })),
        };
    }

    static compare(request, raw): boolean {
        const current = this.toDomain(raw);
        return JSON.stringify(current) === JSON.stringify(request);
    }
}
