import { Injectable, HttpStatus} from '@nestjs/common';
import { TrabalhoProps } from '@domain/entities/Trabalhos';
import { TrabalhoMapper } from '@infra/database/prisma/mappers/Trabalho.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaTrabalhoRepository } from '@infra/database/prisma/repositories/TrabalhoRepository';

const constant = getConstants()

@Injectable()
export class CreateTrabalhoUseCase {
  constructor(private readonly repository: PrismaTrabalhoRepository) {}

  async execute(data: TrabalhoProps): Promise<any> {
    const trabalho = TrabalhoMapper.toGET(data);

    if (!trabalho) {
      throw new AppError(constant.TRABALHO.CREATE_ERROR, HttpStatus.INTERNAL_SERVER_ERROR.toString());
    }

    return await this.repository.save(data);
  }
}