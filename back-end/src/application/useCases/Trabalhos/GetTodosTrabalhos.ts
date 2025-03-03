import { Injectable, HttpStatus} from '@nestjs/common';
import { TrabalhoProps } from '@domain/entities/Trabalhos';
import { TrabalhoMapper } from '@infra/database/prisma/mappers/Trabalho.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaTrabalhoRepository } from '@infra/database/prisma/repositories/TrabalhoRepository';

const constant = getConstants()

@Injectable()
export class GetTodosTrabalhosUseCase {
    constructor(private repository: PrismaTrabalhoRepository) {}

    async execute(): Promise<TrabalhoProps[]> {
        const data = await this.repository.findAll();

        if (!data) {
            throw new AppError(constant.TRABALHO.GET_ALL.ERRO, HttpStatus.NOT_FOUND.toString());
        }

        return data;
    }
}