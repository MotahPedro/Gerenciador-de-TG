import { Module } from '@nestjs/common';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';
import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { PrismaAlunoRepository } from './repositories/AlunoRepository';
import { PrismaTrabalhoRepository } from './repositories/TrabalhoRepository';
import { PrismaLinhaRepository } from './repositories/LinhaRepository';
import { PrismaCursoRepository } from './repositories/CursoRepository';
import { PrismaAdminRepository } from './repositories/AdminRepository';

@Module({
  providers: [
    PrismaRepository,
    PrismaOrientadorRepository,
    PrismaAlunoRepository,
    PrismaTrabalhoRepository,
    PrismaLinhaRepository,
    PrismaCursoRepository,
    PrismaAdminRepository
  ],
  exports: [
    PrismaOrientadorRepository,
    PrismaAlunoRepository,
    PrismaTrabalhoRepository,
    PrismaLinhaRepository,
    PrismaCursoRepository,
    PrismaAdminRepository
  ],
})
export class RepositoriesModule { }
