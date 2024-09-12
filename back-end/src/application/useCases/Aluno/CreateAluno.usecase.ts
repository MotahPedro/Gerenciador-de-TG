import { Injectable, HttpStatus, Inject } from '@nestjs/common';
import { AlunoOrientadoProps } from '@domain/entities/AlunoOrientado';
import { AlunoMapper } from '@infra/database/prisma/mappers/Aluno.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaAlunoRepository } from '@infra/database/prisma/repositories/AlunoRepository';

const constant = getConstants()

@Injectable()
export class CreateAlunoUseCase {
    constructor(
        private readonly repository: PrismaAlunoRepository,
    ) {}

    async execute(aluno: AlunoOrientadoProps) {
        
        await this.validadeAluno(aluno);

        const prismaAluno = AlunoMapper.toPrisma(aluno);

        try {
            const savedAluno = await this.repository.save(prismaAluno);
            return AlunoMapper.toDomain(savedAluno);
        } catch (error) {
            throw new AppError(
                constant.ALUNO.INTERNAL + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR.toString()
            );
        }

    }

    // Fazer turma do aluno ser gerado automaticamente concatenando o ano, o semestre e periodo. Exemplo: 202411 que seria 2024 + 1º semestre + 1º periodo(sendo 2 para a noite)
    private async validadeAluno(aluno: AlunoOrientadoProps) {
        const requiredFields = ['matricula', 'nome', 'email', 'senha', 'curso', 'turma'];
        for (const field of requiredFields) {
            if (!aluno[field]) {
                throw new AppError(constant.ALUNO.VALIDADE, HttpStatus.BAD_REQUEST.toString());
            }
        }

        const existingRa = await this.repository.findByRa(aluno.matricula);
        if (existingRa) {
            throw new AppError(constant.ALUNO.RA, HttpStatus.BAD_REQUEST.toString());
        }

        const existingEmail = await this.repository.findByEmail(aluno.email);
        if (existingEmail) {
            throw new AppError(constant.ALUNO.EMAIL, HttpStatus.BAD_REQUEST.toString());
        }
    }
}