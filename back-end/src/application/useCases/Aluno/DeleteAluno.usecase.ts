import { HttpStatus, Injectable } from '@nestjs/common';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaAlunoRepository } from '@infra/database/prisma/repositories/AlunoRepository';

const constant = getConstants()

@Injectable()
export class DeleteAlunoUseCase {
  constructor(private readonly repository: PrismaAlunoRepository) {}

  async execute(ra: string): Promise<void> {
    
    if (!ra) {
        throw new AppError('RA não pode ser vazio', HttpStatus.BAD_REQUEST.toString());
    }

    const orientador = await this.repository.findByRa(ra);

    if (!orientador) {
      throw new AppError(constant.ALUNO.NOT_FOUND, HttpStatus.NOT_FOUND.toString());
    }

    await this.repository.deleteByRa(ra);
  }
}