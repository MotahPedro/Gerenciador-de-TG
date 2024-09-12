import { Module } from '@nestjs/common';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';
import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { PrismaAlunoRepository } from './repositories/AlunoRepository';

@Module({
  providers: [PrismaOrientadorRepository, PrismaRepository, PrismaAlunoRepository],
  exports: [PrismaOrientadorRepository, PrismaAlunoRepository],
})
export class RepositoriesModule {}
