import { Injectable, HttpStatus} from '@nestjs/common';
import { LinhaProps } from '@domain/entities/LinhaOrientacao';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaLinhaRepository } from '@infra/database/prisma/repositories/LinhaRepository';

const constant = getConstants()

@Injectable()
export class UpdateLinhaUseCase {
    constructor(private readonly repository: PrismaLinhaRepository) {}
    
    async fullUpdate(id: number, linha: LinhaProps): Promise<LinhaProps> {
        const data = await this.repository.findById(id);
    
        if (!data) {
        throw new AppError(constant.LINHA.GET_ID.VAZIO, HttpStatus.NOT_FOUND.toString());
        }
    
        const response = await this.repository.update(id, linha);

        if (!response) {
        throw new AppError(constant.LINHA.UPDATE.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
    
        return response;
    }

    async addOrientadorCpf(id: number, orientadorCpf: string): Promise<LinhaProps> {
        const data = await this.repository.findById(id);

        if (!data) {
            throw new AppError(constant.LINHA.GET_ID.VAZIO, HttpStatus.NOT_FOUND.toString());
        }

        const response = await this.repository.addOrientadorCpf(id, orientadorCpf);

        if (!response) {
            throw new AppError(constant.LINHA.UPDATE.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }

        return response;
    }
}