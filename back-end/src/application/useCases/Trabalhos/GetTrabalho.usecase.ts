import { Injectable, HttpStatus} from '@nestjs/common';
import { TrabalhoProps } from '@domain/entities/Trabalhos';
import { TrabalhoMapper } from '@infra/database/prisma/mappers/Trabalho.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaTrabalhoRepository } from '@infra/database/prisma/repositories/TrabalhoRepository';

const constant = getConstants()

@Injectable()
export class GetTrabalhoUseCase {
    constructor(private readonly repository: PrismaTrabalhoRepository) {}
    
    async byId(id: number): Promise<TrabalhoProps> {
        const data = await this.repository.findById(Number(id));
    
        if (!data) {
        throw new AppError(constant.TRABALHO.GET_ID.ERRO, HttpStatus.NOT_FOUND.toString());
        }
    
        const response = TrabalhoMapper.toGET(data);
    
        if (!response) {
        throw new AppError(constant.TRABALHO.GET_ID.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
    
        return response;
    }

    async byAlunoOrientado(alunoOrientadoRa: string): Promise<TrabalhoProps[]> {
        const data = await this.repository.findByAlunoOrientado(alunoOrientadoRa);
    
        if (!data || data.length === 0) {
        throw new AppError(constant.TRABALHO.GET_ALUNORA.ERRO, HttpStatus.NOT_FOUND.toString());
        }
    
        const response = data.map(TrabalhoMapper.toGET);
    
        if (!response || response.length === 0) {
        throw new AppError(constant.TRABALHO.GET_ALUNORA.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
    
        return response;
    }

}