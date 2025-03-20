import { Injectable, HttpStatus} from '@nestjs/common';
import { CursoProps } from '@domain/entities/CursoProps';
import { CursoMapper } from '@infra/database/prisma/mappers/Curso.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaCursoRepository } from '@infra/database/prisma/repositories/CursoRepository';

const constant = getConstants()

@Injectable()
export class DeleteCursoUseCase {
    constructor(private readonly repository: PrismaCursoRepository) {}
    
    async execute(id: number): Promise<CursoProps> {
        const data = await this.repository.findById(id);
    
        if (!data) {
        throw new AppError(constant.CURSO.NOT_FOUND, HttpStatus.NOT_FOUND.toString());
        }
    
        const response = CursoMapper.toGET(data);
    
        if (!response) {
        throw new AppError(constant.CURSO.NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
    
        return await this.repository.delete(id);
    }
}