import { Injectable, HttpStatus} from '@nestjs/common';
import { LinhaProps } from '@domain/entities/LinhaOrientacao';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaLinhaRepository } from '@infra/database/prisma/repositories/LinhaRepository';

const constant = getConstants()

@Injectable()
export class GetTodasLinhasUseCase {
    constructor(private repository: PrismaLinhaRepository) {}

    async execute(): Promise<LinhaProps[]> {
        const data = await this.repository.findAll();

        if (!data) {
            throw new AppError(constant.LINHA.GET_ALL.NÃO_HA, HttpStatus.NO_CONTENT.toString());
        }

        return data;
    }
}