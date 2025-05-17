import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { OrientadorRepository } from '@domain/repositories/Orientador.repository';
import { Injectable } from '@nestjs/common';
import { ProfessorOrientadorProps } from '@domain/entities/ProfessorOrientador';
import { OrientadorMapper } from '../mappers/Orientador.mapper';
import { BaseRepository } from '../core/Base.repository';

@Injectable()
export class PrismaOrientadorRepository 
  extends BaseRepository 
  implements OrientadorRepository
{

  constructor(
    public readonly prisma: PrismaRepository) {
    super(prisma, 'professorOrientador');
  }

  async save(data: ProfessorOrientadorProps): Promise<any> {
    const accountDb = OrientadorMapper.toPrisma(data);

    return await this.prisma.professorOrientador.create({
      data: accountDb,
      include: {
        alunosOrientados: true,
      }
    });
  }

  async update(cpf: string, data: Partial<ProfessorOrientadorProps>): Promise<any> {
    const accountDb = OrientadorMapper.toPrisma(data);

    return await this.prisma.professorOrientador.update({
      where: { cpf: String(cpf) },
      data: {
        ...accountDb,
        linhasOrientacao: accountDb.linhasOrientacao ? { deleteMany: {}, create: accountDb.linhasOrientacao.create } : undefined,
        cursosAtuacao: accountDb.cursosAtuacao ? { deleteMany: {}, create: accountDb.cursosAtuacao.create } : undefined,
        alunosOrientados: accountDb.alunosOrientados ? { deleteMany: {}, create: accountDb.alunosOrientados.create } : undefined,
      },
    });
  }

  async findByCpf(cpf: string): Promise<any> {
    if (!cpf) {
      throw new Error('CPF is required and cannot be undefined or null.');
    }

    return await this.prisma.professorOrientador.findUnique({
      where: {
        cpf,
      },
    });
  }	

  async findByEmail(email: string): Promise<any> {
    return await this.prisma.professorOrientador.findFirst({
      where: {
        email,
      },
    });
  }

  async findAll(): Promise<any> {
    return await this.prisma.professorOrientador.findMany();
  }

  async deleteByCpf(cpf: string): Promise<any> {
    return await this.prisma.professorOrientador.delete({
      where: {
        cpf,
      },
    });
  }
}
