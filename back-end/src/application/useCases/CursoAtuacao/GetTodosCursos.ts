import { Injectable, HttpStatus} from '@nestjs/common';
import { CursoProps } from '@domain/entities/CursoProps';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaCursoRepository } from '@infra/database/prisma/repositories/CursoRepository';

const constant = getConstants()

@Injectable()
export class GetTodasCursosUseCase {
    constructor(private repository: PrismaCursoRepository) {}

    async execute(): Promise<CursoProps[]> {
        const data = await this.repository.findAll();

        if (!data) {
            throw new AppError(constant.CURSO.GET_ALL.NÃO_HA, HttpStatus.NO_CONTENT.toString());
        }

        return data;
    }
}