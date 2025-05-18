import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { CursoRepository } from '@domain/repositories/Curso.repository';
import { Injectable } from '@nestjs/common';
import { CursoProps } from '@domain/entities/CursoProps';
import { CursoMapper } from '../mappers/Curso.mapper';
import { BaseRepository } from '../core/Base.repository';
import { GetOrientadorUseCase } from '@application/useCases/Orientador/GetOrientador.usecase';
import { GetAlunoUseCase } from '@application/useCases/Aluno/GetAluno.usecase';

@Injectable()
export class PrismaCursoRepository
    extends BaseRepository
    implements CursoRepository {

    constructor(
        public readonly prisma: PrismaRepository,
        public readonly getOrientador: GetOrientadorUseCase,
        public readonly getAluno: GetAlunoUseCase,
    ) {
        super(prisma, 'cursoAtuacao');
    }

    async save(data: CursoProps): Promise<any> {
        const accountDb = CursoMapper.toPrisma(data);

        return await this.prisma.cursoAtuacao.create({
            data: accountDb,
        });
    }
    
    async findById(id: number): Promise<any> {
        return await this.prisma.cursoAtuacao.findUnique({
            where: {
                id: Number(id),
            },
        });
    }
    
    async findByOrientadorCpf(professorOrientadorCpf: string): Promise<any> {
        return await this.prisma.cursoAtuacao.findFirst({
            where: {
                orientadoresCpfs: {
                    array_contains: professorOrientadorCpf,
                },
            },
        });
    }
    
    async update(id: number, data: Partial<CursoProps>): Promise<any> {
        const accountDb = CursoMapper.toPrisma(data);

        return await this.prisma.cursoAtuacao.update({
            where: { id: Number(id) },
            data: accountDb,
        });
    }

    async findAll(): Promise<any> {
        return await this.prisma.cursoAtuacao.findMany();
    }

    async delete(id: number): Promise<any> {
        return await this.prisma.cursoAtuacao.delete({
            where: {
                id: Number(id)
            },
        });
    }

    async addOrientadorCpf(id: number, orientadorCpf: string): Promise<any> {
        const curso = await this.prisma.cursoAtuacao.findUnique({
            where: { id: Number(id) },
        });

        if (!curso) {
            throw new Error('Linha not found');
        }

        const cpfsArray: string[] = Array.isArray(curso.orientadoresCpfs) ? curso.orientadoresCpfs.map(cpf => String(cpf)) : [];

        let cpfString = orientadorCpf;
        if (typeof orientadorCpf !== 'string') {
            const match = JSON.stringify(orientadorCpf).match(/"orientadoresCpfs":"(\d+)"/);
            if (match) {
                cpfString = match[1];
            }
        }

        const orientador = await this.getOrientador.execute(cpfString)

        const nomeCurso = curso.curso
        
        const cursosOrientadorArray: string[] = Array.isArray(orientador.cursosAtuacao) ? orientador.cursosAtuacao.map(cpf => String(cpf)) : [];

        const updatedOrientadorCursos = [...cursosOrientadorArray, nomeCurso]
        const updatedCpfs = [...cpfsArray, cpfString];

        const updatedOrientador = await this.prisma.professorOrientador.update({
            where: { cpf: cpfString },
            data: {
                cursosAtuacao: updatedOrientadorCursos,
            }
        })

        const updatedCurso = await this.prisma.cursoAtuacao.update({
            where: { id: Number(id) },
            data: {
                orientadoresCpfs: updatedCpfs,
            },
        });

        return { updatedCurso, updatedOrientador }
    }

    async addAlunoMatricula(id: number, alunoMatricula: string): Promise<any> {
        const curso = await this.prisma.cursoAtuacao.findUnique({
            where: { id: Number(id) },
        });

        if (!curso) {
            throw new Error('Linha not found');
        }

        const cpfsArray: string[] = Array.isArray(curso.alunosMatriculas) ? curso.alunosMatriculas.map(cpf => String(cpf)) : [];

        let matriculaString = alunoMatricula;
        if (typeof alunoMatricula !== 'string') {
            const match = JSON.stringify(alunoMatricula).match(/"alunosMatriculas":"(\d+)"/);
            if (match) {
                matriculaString = match[1];
            }
        }

        const nomeCurso = curso.curso

        const cursoDoAluno = nomeCurso
        const updatedCpfs = [...cpfsArray, matriculaString];

        const updatedOrientador = await this.prisma.alunoOrientado.update({
            where: { matricula: matriculaString },
            data: {
                curso: cursoDoAluno,
            }
        })

        const updatedCurso =  await this.prisma.cursoAtuacao.update({
            where: { id: Number(id) },
            data: {
                alunosMatriculas: updatedCpfs,
            },
        });

        return { updatedCurso, updatedOrientador }
    }

}