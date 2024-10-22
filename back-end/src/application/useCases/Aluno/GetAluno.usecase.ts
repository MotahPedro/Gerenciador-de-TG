import { HttpStatus, Injectable } from '@nestjs/common';
import { AlunoOrientadoProps } from '@domain/entities/AlunoOrientado';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { AlunoMapper } from '@infra/database/prisma/mappers/Aluno.mapper';
import { PrismaAlunoRepository } from '@infra/database/prisma/repositories/AlunoRepository';

const constant = getConstants()

@Injectable()
export class GetAlunoUseCase {
    constructor(private repository: PrismaAlunoRepository) {}

    async execute(ra: string): Promise<AlunoOrientadoProps> {
        const data = await this.repository.findByRa(ra);

        if (!data) {
            throw new AppError(constant.ALUNO.GET_RA.ERRO, HttpStatus.NOT_FOUND.toString());
        }

        const response = AlunoMapper.toGET(data);

        if (!response) {
            throw new AppError(constant.ALUNO.GET_RA.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }

        return response;
    }
}
