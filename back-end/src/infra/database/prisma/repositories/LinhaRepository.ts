import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { LinhaRepository } from '@domain/repositories/Linha.repository';
import { Injectable } from '@nestjs/common';
import { LinhaProps } from '@domain/entities/LinhaOrientacao';
import { LinhaMapper } from '../mappers/Linha.mapper';
import { BaseRepository } from '../core/Base.repository';

@Injectable()
export class PrismaLinhaRepository
    extends BaseRepository
    implements LinhaRepository {

    constructor(
        public readonly prisma: PrismaRepository) {
        super(prisma, 'linhaOrientacao');
    }

    async save(data: LinhaProps): Promise<any> {
        const accountDb = LinhaMapper.toPrisma(data);

        return await this.prisma.linhaOrientacao.create({
            data: accountDb,
        });
    }
    
    async findById(id: number): Promise<any> {
        return await this.prisma.linhaOrientacao.findUnique({
            where: {
                id: Number(id),
            },
        });
    }
    
    async findByCpf(professorOrientadorCpf: string): Promise<any> {
        return await this.prisma.linhaOrientacao.findFirst({
            where: {
                cpfs: {
                    array_contains: professorOrientadorCpf,
                },
            },
        });
    }
    
    async update(id: number, data: Partial<LinhaProps>): Promise<any> {
        const accountDb = LinhaMapper.toPrisma(data);

        return await this.prisma.linhaOrientacao.update({
            where: { id: Number(id) },
            data: accountDb,
        });
    }

    async findAll(): Promise<any> {
        return await this.prisma.linhaOrientacao.findMany();
    }

    async delete(id: number): Promise<any> {
        return await this.prisma.linhaOrientacao.delete({
            where: {
                id: Number(id)
            },
        });
    }

    async addOrientadorCpf(id: number, orientadorCpf: string): Promise<any> {
        const linha = await this.prisma.linhaOrientacao.findUnique({
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

        return await this.prisma.linhaOrientacao.update({
            where: { id: Number(id) },
            data: {
                cpfs: updatedCpfs,
            },
        });
    }

}