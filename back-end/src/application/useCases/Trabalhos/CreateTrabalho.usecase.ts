import { Injectable, HttpStatus } from '@nestjs/common';
import { TrabalhoProps } from '@domain/entities/Trabalhos';
import { TrabalhoMapper } from '@infra/database/prisma/mappers/Trabalho.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaTrabalhoRepository } from '@infra/database/prisma/repositories/TrabalhoRepository';

const constant = getConstants()

@Injectable()
export class CreateTrabalhoUseCase {
  constructor(private readonly repository: PrismaTrabalhoRepository) { }

  async execute(data: TrabalhoProps): Promise<any> {
    const trabalho = TrabalhoMapper.toPrisma(data);

    try {
      if (!trabalho) {
        throw new AppError(constant.TRABALHO.CREATE_ERROR, HttpStatus.INTERNAL_SERVER_ERROR.toString());
      }

      // Teria uma validação se o ra do aluno está registrado, mas mais a frente tentarei colocar um metodo de adicionar esse ra do aluno diretamente no payload do trabalho

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