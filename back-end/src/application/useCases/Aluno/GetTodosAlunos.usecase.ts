import { Injectable, HttpStatus } from '@nestjs/common';
import { AlunoOrientadoProps } from '@domain/entities/AlunoOrientado';
import { AlunoMapper } from '@infra/database/prisma/mappers/Aluno.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaAlunoRepository } from '@infra/database/prisma/repositories/AlunoRepository';

const constant = getConstants()

@Injectable()
export class GetTodosAlunoUseCase {
    constructor(private repository: PrismaAlunoRepository) {}

    async execute(): Promise<AlunoOrientadoProps[]> {
        const data = await this.repository.findAll();

        if (!data) {
            throw new AppError(constant.ALUNO.GET_ALL.ERRO, HttpStatus.NOT_FOUND.toString());
        }

        return data;
    }
}