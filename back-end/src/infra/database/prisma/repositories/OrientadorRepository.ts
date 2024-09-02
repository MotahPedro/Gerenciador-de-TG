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
    });

  }

  // async update(id: string): Promise<any> {
  //   await this.prisma.professorOrientador.update({
  //     where: { id: Number(id) },
  //     data: { updatedAt: new Date() },
  //   });
  // }

  // async findByOrientadorId (subscriberId: string) {
  //   return await this.prisma.professorOrientador.findFirst({
  // })
  // }
  
}
