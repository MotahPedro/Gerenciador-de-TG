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
    
    async findByCpf(professorOrientadorCpf: string): Promise<any> {
        return await this.prisma.cursoAtuacao.findFirst({
            where: {
                cpfs: {
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

        const cpfsArray: string[] = Array.isArray(linha.cpfs) ? linha.cpfs.map(cpf => String(cpf)) : [];

        let cpfString = orientadorCpf;
        if (typeof orientadorCpf !== 'string') {
            const match = JSON.stringify(orientadorCpf).match(/"cpfs":"(\d+)"/);
            if (match) {
                cpfString = match[1];
            }
        }

        const updatedCpfs = [...cpfsArray, cpfString];

        console.log(updatedCpfs);

        return await this.prisma.cursoAtuacao.update({
            where: { id: Number(id) },
            data: {
                cpfs: updatedCpfs,
            },
        });
    }

}