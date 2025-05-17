import { Injectable, HttpStatus} from '@nestjs/common';
import { CursoProps } from '@domain/entities/CursoProps';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaCursoRepository } from '@infra/database/prisma/repositories/CursoRepository';

const constant = getConstants()

@Injectable()
export class UpdateCursoUseCase {
    constructor(private readonly repository: PrismaCursoRepository) {}
    
    async fullUpdate(id: number, curso: CursoProps): Promise<CursoProps> {
        const data = await this.repository.findById(id);
    
        if (!data) {
        throw new AppError(constant.CURSO.GET_ID.VAZIO, HttpStatus.NOT_FOUND.toString());
        }
    
        const response = await this.repository.update(id, curso);

        if (!response) {
        throw new AppError(constant.CURSO.UPDATE.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
    
        return response;
    }

    async addOrientadorCpf(id: number, orientadorCpf: string): Promise<CursoProps> {
        const data = await this.repository.findById(id);

        if (!data) {
            throw new AppError(constant.CURSO.GET_ID.VAZIO, HttpStatus.NOT_FOUND.toString());
        }

        const response = await this.repository.addOrientadorCpf(id, orientadorCpf);

        if (!response) {
            throw new AppError(constant.CURSO.UPDATE.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }

        return response;
    }

    async addAlunoMatricula(id: number, matricula: string): Promise<CursoProps> {
        const data = await this.repository.findById(id);

        if (!data) {
            throw new AppError(constant.CURSO.GET_ID.VAZIO, HttpStatus.NOT_FOUND.toString());
        }

        const response = await this.repository.addAlunoMatricula(id, matricula);

        if (!response) {
            throw new AppError(constant.CURSO.UPDATE.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }

        return response;
    }
}