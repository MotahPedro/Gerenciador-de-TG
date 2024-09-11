import { HttpStatus, Injectable } from '@nestjs/common';
import { ProfessorOrientadorProps } from '@domain/entities/ProfessorOrientador';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { OrientadorMapper } from '@infra/database/prisma/mappers/Orientador.mapper';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';

const constant = getConstants()

@Injectable()
export class GetOrientadorUseCase {
    constructor(private repository: PrismaOrientadorRepository) {}

    async execute(cpf: string): Promise<ProfessorOrientadorProps> {
        const data = await this.repository.findByCpf(cpf);

        if (!data) {
            throw new AppError(constant.ORIENTADOR.GET_CPF.ERRO, HttpStatus.NOT_FOUND.toString());
        }

        const response = OrientadorMapper.toGET(data);

        if (!response) {
            throw new AppError(constant.ORIENTADOR.GET_CPF.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }

        return response;
    }

}
