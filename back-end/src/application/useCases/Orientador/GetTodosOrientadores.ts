import { HttpStatus, Injectable } from '@nestjs/common';
import { ProfessorOrientadorProps } from '@domain/entities/ProfessorOrientador';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { OrientadorMapper } from '@infra/database/prisma/mappers/Orientador.mapper';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository'

const constant = getConstants()

@Injectable()
export class GetTodosOrientadoresUseCase {
    constructor(private repository: PrismaOrientadorRepository) {}

    async execute(): Promise<ProfessorOrientadorProps[]> {
        const data = await this.repository.findAll();

        if (!data) {
            throw new AppError(constant.ORIENTADOR.GET_ALL.ERRO, HttpStatus.NOT_FOUND.toString());
        }

        return data;
    }
}