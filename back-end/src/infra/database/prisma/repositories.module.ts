import { Module } from '@nestjs/common';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';
import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { PrismaAlunoRepository } from './repositories/AlunoRepository';
import { PrismaTrabalhoRepository } from './repositories/TrabalhoRepository';

@Module({
  providers: [
    PrismaRepository,
    PrismaOrientadorRepository,
    PrismaAlunoRepository,
    PrismaTrabalhoRepository
  ],
  exports: [
    PrismaOrientadorRepository,
    PrismaAlunoRepository
  ],
})
export class RepositoriesModule { }
