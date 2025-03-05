import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { LinhaRepository } from '@domain/repositories/Linha.repository';
import { Injectable } from '@nestjs/common';
import { LinhaProps } from '@domain/entities/LinhaOrientação';
import { LinhaMapper } from '../mappers/Linha.mapper';
import { BaseRepository } from '../core/Base.repository';

@Injectable()
export class PrismaLinhaRepository
    extends BaseRepository
    implements LinhaRepository {

    //   abstract save(trabalho: LinhaProps): Promise<any>;
    //   abstract findById(id: number): Promise<LinhaProps>;
    //   abstract deleteById(id: number): Promise<void>;

    constructor(
        public readonly prisma: PrismaRepository) {
        super(prisma, 'trabalho');
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
