import { Injectable, HttpStatus} from '@nestjs/common';
import { LinhaProps } from '@domain/entities/LinhaOrientacao';
import { LinhaMapper } from '@infra/database/prisma/mappers/Linha.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaLinhaRepository } from '@infra/database/prisma/repositories/LinhaRepository';

const constant = getConstants()

@Injectable()
export class DeleteLinhaUseCase {
    constructor(private readonly repository: PrismaLinhaRepository) {}
    
    async execute(id: number): Promise<LinhaProps> {
        const data = await this.repository.findById(id);
    
        if (!data) {
        throw new AppError(constant.LINHA.NOT_FOUND, HttpStatus.NOT_FOUND.toString());
        }
    
        const response = LinhaMapper.toGET(data);
    
        if (!response) {
        throw new AppError(constant.LINHA.NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
    
        return await this.repository.delete(id);
    }
}