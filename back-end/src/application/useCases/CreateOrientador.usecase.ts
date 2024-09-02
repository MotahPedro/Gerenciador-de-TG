import { Injectable, HttpStatus, Inject } from '@nestjs/common';
import { ProfessorOrientadorProps } from '@domain/entities/ProfessorOrientador';
import { OrientadorMapper } from '@infra/database/prisma/mappers/Orientador.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';

const constant = getConstants()

@Injectable()
export class CreateOrientadorUseCase {
    constructor(
        private readonly repository: PrismaOrientadorRepository,
    ) {}

    async execute(orientador: ProfessorOrientadorProps) {
        
        this.validadeOrientador(orientador);

        const prismaOrientador = OrientadorMapper.toPrisma(orientador);

        try {
            const savedOrientador = await this.repository.save(prismaOrientador);
            
            return OrientadorMapper.toDomain(savedOrientador);
        } catch (error) {
            throw new AppError(
                constant.ORIENTADOR.INTERNAL + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR.toString()
            );
        }


    }

    private validadeOrientador(orientador: ProfessorOrientadorProps) {
        if (!orientador.cpf || !orientador.nome || !orientador.email) {
            throw new AppError(constant.ORIENTADOR.VALIDADE, HttpStatus.BAD_REQUEST.toString());
        }
    }
}