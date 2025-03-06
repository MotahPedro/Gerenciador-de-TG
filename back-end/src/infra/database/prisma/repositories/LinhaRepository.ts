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
        super(prisma, 'linha');
    }

    async save(data: LinhaProps): Promise<any> {
        const accountDb = LinhaMapper.toPrisma(data);

        return await this.prisma.trabalho.create({
            data: accountDb,
        });
    }
    
    async findById(id: number): Promise<any> {
        return await this.prisma.trabalho.findUnique({
            where: {
                id: Number(id),
            },
        });
    }
    
    async findByCpf(professorOrientadorCpf: string): Promise<any> {
        // return await this.prisma.trabalho.findUnique({
        //     where: {
        //         professorOrientadorCpf,
        //     },
        // });
    }
    
    async update(id: number, data: Partial<LinhaProps>): Promise<any> {
        const accountDb = LinhaMapper.toPrisma(data);

        return await this.prisma.trabalho.update({
            where: { id: Number(id) },
            data: accountDb,
        });
    }

    async findAll(): Promise<any> {
        return await this.prisma.trabalho.findMany();
    }

    async delete(id: number): Promise<any> {
        return await this.prisma.trabalho.delete({
            where: {
                id: Number(id)
            },
        });
    }

}