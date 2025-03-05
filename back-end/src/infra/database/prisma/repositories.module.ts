import { Module } from '@nestjs/common';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';
import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { PrismaAlunoRepository } from './repositories/AlunoRepository';
import { PrismaTrabalhoRepository } from './repositories/TrabalhoRepository';
import { PrismaLinhaRepository } from './repositories/LinhaRepository';

@Module({
  providers: [
    PrismaRepository,
    PrismaOrientadorRepository,
    PrismaAlunoRepository,
    PrismaTrabalhoRepository,
    PrismaLinhaRepository,
  ],
  exports: [
    PrismaOrientadorRepository,
    PrismaAlunoRepository,
    PrismaTrabalhoRepository,
    PrismaLinhaRepository,
  ],
})
export class RepositoriesModule { }
