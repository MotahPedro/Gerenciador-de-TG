import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { TrabalhoRepository } from '@domain/repositories/Trabalhos.repository';
import { Injectable } from '@nestjs/common';
import { TrabalhoProps } from '@domain/entities/Trabalhos';
import { TrabalhoMapper } from '../mappers/Trabalho.mapper';
import { BaseRepository } from '../core/Base.repository';

@Injectable()
export class PrismaTrabalhoRepository 
  extends BaseRepository 
  implements TrabalhoRepository
{

//   abstract save(trabalho: TrabalhoProps): Promise<any>;
//   abstract findById(id: number): Promise<TrabalhoProps>;
//   abstract deleteById(id: number): Promise<void>;

  constructor(
    public readonly prisma: PrismaRepository) {
    super(prisma, 'alunoOrientado');
  }

  async save(data: TrabalhoProps): Promise<any> {
    const accountDb = TrabalhoMapper.toPrisma(data);

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

  async findById(id: number): Promise<any> {

    return await this.prisma.alunoOrientado.findUnique({
      where: {
        id,
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

  async deleteById(id: number): Promise<any> {
    return await this.prisma.alunoOrientado.delete({
      where: {
        id,
      },
    });
  }
  
}
