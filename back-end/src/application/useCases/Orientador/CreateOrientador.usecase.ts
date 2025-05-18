import { Injectable, HttpStatus} from '@nestjs/common';
import { ProfessorOrientadorProps } from '@domain/entities/ProfessorOrientador';
import { OrientadorMapper } from '@infra/database/prisma/mappers/Orientador.mapper';

import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';
import { PasswordHasherService } from '@application/services/passwordHasher.service';

const constant = getConstants()

@Injectable()
export class CreateOrientadorUseCase {
    constructor(
        private readonly repository: PrismaOrientadorRepository,
        private readonly passwordHasherService: PasswordHasherService,
    ) {}

    async execute(orientador: ProfessorOrientadorProps) {
        
        await this.validadeOrientador(orientador);

        orientador.senha = await this.passwordHasherService.hashPassword(orientador.senha);

        const prismaOrientador = OrientadorMapper.toPrisma(orientador);

        try {
            const orientadorSalvo = await this.repository.save(prismaOrientador);
            return OrientadorMapper.toDomain(orientadorSalvo);
        } catch (error) {
            throw new AppError(
                constant.ORIENTADOR.INTERNAL + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR.toString()
            );
        }

    }

    private async validadeOrientador(orientador: ProfessorOrientadorProps) {
        const requiredFields = ['cpf', 'nome', 'email', 'senha', 'linhasOrientacao', 'cursosAtuacao'];
        for (const field of requiredFields) {
            if (!orientador[field]) {
                throw new AppError(constant.ORIENTADOR.VALIDADE, HttpStatus.BAD_REQUEST.toString());
            }
        }

        const existingCPF = await this.repository.findByCpf(orientador.cpf);
        if (existingCPF) {
            throw new AppError(constant.ORIENTADOR.CPF, HttpStatus.BAD_REQUEST.toString());
        }

        const existingEmail = await this.repository.findByEmail(orientador.email);
        if (existingEmail) {
            throw new AppError(constant.ORIENTADOR.EMAIL, HttpStatus.BAD_REQUEST.toString());
        }

        orientador.cargo = 'Orientador';
    }
}