import { Injectable, HttpStatus } from '@nestjs/common';
import { CursoProps } from '@domain/entities/CursoProps';
import { CursoMapper } from '@infra/database/prisma/mappers/Curso.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaCursoRepository } from '@infra/database/prisma/repositories/CursoRepository';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';

const constant = getConstants()

@Injectable()
export class CreateCursoUseCase {
    constructor(
        private readonly repository: PrismaCursoRepository,
        private readonly orientadorRepository: PrismaOrientadorRepository
    ) { }

    async execute(data: CursoProps): Promise<any> {
        try {
            const curso = CursoMapper.toPrisma(data);

            if (!curso) {
                throw new AppError(constant.CURSO.CREATE_ERROR, HttpStatus.INTERNAL_SERVER_ERROR.toString());
            }

            console.log(curso);            
            
            const orientadorCpf = await this.orientadorRepository.findByCpf(curso.professorOrientadorCpf);
            
            console.log(orientadorCpf);

            if (!orientadorCpf) {
                throw new AppError(constant.CURSO.INVALID_CPF, HttpStatus.BAD_REQUEST.toString());
            }

            const cursoSalvo = await this.repository.save(data);
            return CursoMapper.toDomain(cursoSalvo);

        } catch (error) {
            throw new AppError(
                constant.LINHA.INTERNAL + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR.toString()
            );
        }
    }
}