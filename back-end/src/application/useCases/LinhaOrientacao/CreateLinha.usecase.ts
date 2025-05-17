import { Injectable, HttpStatus } from '@nestjs/common';
import { LinhaProps } from '@domain/entities/LinhaOrientacao';
import { LinhaMapper } from '@infra/database/prisma/mappers/Linha.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaLinhaRepository } from '@infra/database/prisma/repositories/LinhaRepository';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';

const constant = getConstants()

@Injectable()
export class CreateLinhaUseCase {
    constructor(
        private readonly repository: PrismaLinhaRepository,
        private readonly orientadorRepository: PrismaOrientadorRepository
    ) { }

    async execute(data: LinhaProps): Promise<any> {
        try {
            const linha = LinhaMapper.toPrisma(data);

            if (!linha) {
                throw new AppError(constant.LINHA.CREATE_ERROR, HttpStatus.INTERNAL_SERVER_ERROR.toString());
            }

            const linhaSalva = await this.repository.save(data);
            return LinhaMapper.toDomain(linhaSalva);

        } catch (error) {
            throw new AppError(
                constant.LINHA.INTERNAL + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR.toString()
            );
        }
    }
}