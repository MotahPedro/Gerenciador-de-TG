import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { CursoRepository } from '@domain/repositories/Curso.repository';
import { Injectable } from '@nestjs/common';
import { CursoProps } from '@domain/entities/CursoProps';
import { CursoMapper } from '../mappers/Curso.mapper';
import { BaseRepository } from '../core/Base.repository';

@Injectable()
export class PrismaCursoRepository
    extends BaseRepository
    implements CursoRepository {

    constructor(
        public readonly prisma: PrismaRepository) {
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
        const linha = await this.prisma.cursoAtuacao.findUnique({
            where: { id: Number(id) },
        });

        if (!linha) {
            throw new Error('Linha not found');
        }

        const cpfsArray: string[] = Array.isArray(linha.orientadoresCpfs) ? linha.orientadoresCpfs.map(cpf => String(cpf)) : [];

        let cpfString = orientadorCpf;
        if (typeof orientadorCpf !== 'string') {
            const match = JSON.stringify(orientadorCpf).match(/"orientadoresCpfs":"(\d+)"/);
            if (match) {
                cpfString = match[1];
            }
        }

        const updatedCpfs = [...cpfsArray, cpfString];

        return await this.prisma.cursoAtuacao.update({
            where: { id: Number(id) },
            data: {
                orientadoresCpfs: updatedCpfs,
            },
        });
    }

    async addAlunoMatricula(id: number, alunoCpf: string): Promise<any> {
        const linha = await this.prisma.cursoAtuacao.findUnique({
            where: { id: Number(id) },
        });

        if (!linha) {
            throw new Error('Linha not found');
        }

        const cpfsArray: string[] = Array.isArray(linha.alunosMatriculas) ? linha.alunosMatriculas.map(cpf => String(cpf)) : [];

        let cpfString = alunoCpf;
        if (typeof alunoCpf !== 'string') {
            const match = JSON.stringify(alunoCpf).match(/"alunosMatriculas":"(\d+)"/);
            if (match) {
                cpfString = match[1];
            }
        }

        const updatedCpfs = [...cpfsArray, cpfString];

        return await this.prisma.cursoAtuacao.update({
            where: { id: Number(id) },
            data: {
                alunosMatriculas: updatedCpfs,
            },
        });
    }

}