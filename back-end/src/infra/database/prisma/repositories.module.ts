import { Module } from '@nestjs/common';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';
import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';

@Module({
  providers: [PrismaOrientadorRepository, PrismaRepository],
  exports: [PrismaOrientadorRepository],
})
export class RepositoriesModule {}
