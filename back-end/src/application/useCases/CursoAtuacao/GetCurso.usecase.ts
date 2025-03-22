import { Injectable, HttpStatus} from '@nestjs/common';
import { CursoProps } from '@domain/entities/CursoProps';
import { CursoMapper } from '@infra/database/prisma/mappers/Curso.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaCursoRepository } from '@infra/database/prisma/repositories/CursoRepository';

const constant = getConstants()

@Injectable()
export class GetCursoUseCase {
    constructor(private readonly repository: PrismaCursoRepository) {}
    
    async byId(id: number): Promise<CursoProps> {
        const data = await this.repository.findById(Number(id));
    
        if (!data) {
        throw new AppError(constant.CURSO.GET_ID.VAZIO, HttpStatus.NOT_FOUND.toString());
        }
    
        const response = CursoMapper.toGET(data);
    
        if (!response) {
        throw new AppError(constant.CURSO.GET_ID.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
    
        return response;
    }

    async byOrientadorCpf(orientadorCpf: string): Promise<CursoProps[]> {
        const data = await this.repository.findByCpf(orientadorCpf);

        const targetCpf = data.cpfs.find(cpf => cpf === orientadorCpf);
        
        if (!targetCpf) {
            throw new AppError(constant.CURSO.GET_CPF.VAZIO, HttpStatus.NOT_FOUND.toString());
        }
    
        return data;
    }

}