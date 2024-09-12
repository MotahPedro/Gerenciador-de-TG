import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { AlunoRepository } from '@domain/repositories/Aluno.repository';
import { Injectable } from '@nestjs/common';
import { AlunoOrientadoProps } from '@domain/entities/AlunoOrientado';
import { AlunoMapper } from '../mappers/Aluno.mapper';
import { BaseRepository } from '../core/Base.repository';

@Injectable()
export class PrismaAlunoRepository 
  extends BaseRepository 
  implements AlunoRepository
{

  constructor(
    public readonly prisma: PrismaRepository) {
    super(prisma, 'alunoOrientado');
  }

  async save(data: AlunoOrientadoProps): Promise<any> {
    const accountDb = AlunoMapper.toPrisma(data);

    return await this.prisma.alunoOrientado.create({
      data: accountDb,
      include: {
        trabalhos: true,
      }
    });
  }

  // async update(id: string): Promise<any> {
  //   await this.prisma.alunoOrientado.update({
  //     where: { id: Number(id) },
  //     data: { updatedAt: new Date() },
  //   });
  // }

  // async findByOrientadorId (subscriberId: string) {
  //   return await this.prisma.alunoOrientado.findFirst({
  // })
  // }

  async findByRa(matricula: string): Promise<any> {

    return await this.prisma.alunoOrientado.findUnique({
      where: {
        matricula,
      },
    });
  }	

  async findByEmail(email: string): Promise<any> {
    return await this.prisma.alunoOrientado.findFirst({
      where: {
        email,
      },
    });
  }

  async deleteByRa(matricula: string): Promise<any> {
    return await this.prisma.alunoOrientado.delete({
      where: {
        matricula,
      },
    });
  }
  
}
