import { Injectable, HttpStatus} from '@nestjs/common';
import { TrabalhoProps } from '@domain/entities/Trabalhos';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaTrabalhoRepository } from '@infra/database/prisma/repositories/TrabalhoRepository';

const constant = getConstants()

@Injectable()
export class UpdateTrabalhoUseCase {
    constructor(private readonly repository: PrismaTrabalhoRepository) {}
    
    async execute(id: number, trabalho: TrabalhoProps): Promise<TrabalhoProps> {
        const data = await this.repository.findById(id);
    
        if (!data) {
        throw new AppError(constant.TRABALHO.GET_ID.ERRO, HttpStatus.NOT_FOUND.toString());
        }
    
        const response = await this.repository.update(id, trabalho);
    
        if (!response) {
        throw new AppError(constant.TRABALHO.UPDATE.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
    
        return response;
    }
}