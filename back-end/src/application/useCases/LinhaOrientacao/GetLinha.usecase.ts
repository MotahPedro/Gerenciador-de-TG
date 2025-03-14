import { Injectable, HttpStatus} from '@nestjs/common';
import { LinhaProps } from '@domain/entities/LinhaOrientacao';
import { LinhaMapper } from '@infra/database/prisma/mappers/Linha.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaLinhaRepository } from '@infra/database/prisma/repositories/LinhaRepository';

const constant = getConstants()

@Injectable()
export class GetLinhaUseCase {
    constructor(private readonly repository: PrismaLinhaRepository) {}
    
    async byId(id: number): Promise<LinhaProps> {
        const data = await this.repository.findById(Number(id));
    
        if (!data) {
        throw new AppError(constant.LINHA.GET_ID.VAZIO, HttpStatus.NOT_FOUND.toString());
        }
    
        const response = LinhaMapper.toGET(data);
    
        if (!response) {
        throw new AppError(constant.LINHA.GET_ID.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
    
        return response;
    }

    async byOrientadorCpf(orientadorCpf: string): Promise<LinhaProps[]> {
        const data = await this.repository.findByCpf(orientadorCpf);

        console.log(data);
        
        if (!data || !Array.isArray(data) || data.length === 0) {
            throw new AppError(constant.LINHA.GET_CPF.VAZIO, HttpStatus.NOT_FOUND.toString());
        }
    
        const response = data.map(LinhaMapper.toGET);
    
        if (!response || response.length === 0) {
            throw new AppError(constant.LINHA.GET_CPF.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
    
        return response;
    }

}