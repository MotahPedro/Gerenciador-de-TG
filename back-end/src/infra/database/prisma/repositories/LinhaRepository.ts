import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { LinhaRepository } from '@domain/repositories/Linha.repository';
import { Injectable } from '@nestjs/common';
import { LinhaProps } from '@domain/entities/LinhaOrientacao';
import { LinhaMapper } from '../mappers/Linha.mapper';
import { BaseRepository } from '../core/Base.repository';
import { GetOrientadorUseCase } from '@application/useCases/Orientador/GetOrientador.usecase';

@Injectable()
export class PrismaLinhaRepository
    extends BaseRepository
    implements LinhaRepository {

    constructor(
        public readonly prisma: PrismaRepository,
        public readonly getOrientador: GetOrientadorUseCase
    ) {
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
                orientadoresCpfs: {
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

        const orientadoresCpfsArray: string[] = Array.isArray(linha.orientadoresCpfs) ? linha.orientadoresCpfs.map(cpf => String(cpf)) : [];

        let cpfString = orientadorCpf;
        if (typeof orientadorCpf !== 'string') {
            const match = JSON.stringify(orientadorCpf).match(/"orientadoresCpfs":"(\d+)"/);
            if (match) {
                cpfString = match[1];
            }
        }        

        const orientador = await this.getOrientador.execute(cpfString)

        const nomeLinha = linha.linha
        
        const linhasOrientadorArray: string[] = Array.isArray(orientador.linhasOrientacao) ? orientador.linhasOrientacao.map(cpf => String(cpf)) : [];

        const updatedLinhas = [...linhasOrientadorArray, nomeLinha]
        const updatedCpfs = [...orientadoresCpfsArray, cpfString];        

        const updatedOrientador = await this.prisma.professorOrientador.update({
            where: { cpf: cpfString },
            data: {
                linhasOrientacao: updatedLinhas
            }
        })

        const updatedLinha = await this.prisma.linhaOrientacao.update({
            where: { id: Number(id) },
            data: {
                orientadoresCpfs: updatedCpfs,
            },
        });

        return { updatedLinha, updatedOrientador }
    }
}