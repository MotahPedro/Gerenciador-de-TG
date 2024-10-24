import { HttpStatus, Injectable } from '@nestjs/common';
import { AlunoOrientadoProps } from '@domain/entities/AlunoOrientado';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaAlunoRepository } from '@infra/database/prisma/repositories/AlunoRepository';

const constant = getConstants()

@Injectable()
export class UpdateAlunoUsecase {
    constructor(private repository: PrismaAlunoRepository) {}

    async execute(ra: string, aluno: AlunoOrientadoProps): Promise<AlunoOrientadoProps> {
        const data = await this.repository.findByRa(ra);

        if (!data) {
            throw new AppError(constant.ALUNO.GET_RA.ERRO, HttpStatus.NOT_FOUND.toString());
        }

        const response = await this.repository.update(ra, aluno);

        if (!response) {
            throw new AppError(constant.ALUNO.UPDATE.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }

        return response;
    }
}