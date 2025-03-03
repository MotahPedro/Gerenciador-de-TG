import { Injectable, HttpStatus } from '@nestjs/common';
import { TrabalhoProps } from '@domain/entities/Trabalhos';
import { TrabalhoMapper } from '@infra/database/prisma/mappers/Trabalho.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaTrabalhoRepository } from '@infra/database/prisma/repositories/TrabalhoRepository';
import { PrismaAlunoRepository } from '@infra/database/prisma/repositories/AlunoRepository';

const constant = getConstants()

@Injectable()
export class CreateTrabalhoUseCase {
  constructor(
    private readonly repository: PrismaTrabalhoRepository,
    private readonly alunoRepository: PrismaAlunoRepository
  ) { }

  async execute(data: TrabalhoProps): Promise<any> {
    try {
      const trabalho = TrabalhoMapper.toPrisma(data);

      if (!trabalho) {
        throw new AppError(constant.TRABALHO.CREATE_ERROR, HttpStatus.INTERNAL_SERVER_ERROR.toString());
      }

      const alunoRA = await this.alunoRepository.findByRa(data.alunoOrientadoRa);
      if (!alunoRA) {
        throw new AppError(constant.TRABALHO.INVALID_RA, HttpStatus.BAD_REQUEST.toString());
      }

      const trabalhoSalvo = await this.repository.save(trabalho);
      return TrabalhoMapper.toDomain(trabalhoSalvo);

    } catch (error) {
      throw new AppError(
        constant.TRABALHO.INTERNAL + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR.toString()
      );
    }
  }
}