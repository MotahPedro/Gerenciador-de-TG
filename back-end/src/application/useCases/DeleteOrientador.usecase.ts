import { HttpStatus, Injectable } from '@nestjs/common';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { OrientadorMapper } from '@infra/database/prisma/mappers/Orientador.mapper';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';

const constant = getConstants()

@Injectable()
export class DeleteOrientadorUseCase {
  constructor(private readonly repository: PrismaOrientadorRepository) {}

  async execute(cpf: string): Promise<void> {
    const orientador = await this.repository.findByCpf(cpf);

    if (!orientador) {
      throw new AppError(constant.ORIENTADOR.NOT_FOUND, HttpStatus.NOT_FOUND.toString());
    }

    await this.repository.deleteByCpf(cpf);
  }
}