import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { AdminRepository } from '@domain/repositories/Admin.repository';
import { Injectable } from '@nestjs/common';
import { AdminProps } from '@domain/entities/Admin';
import { AdminMapper } from '../mappers/Admin.mapper';
import { BaseRepository } from '../core/Base.repository';

@Injectable()
export class PrismaAdminRepository 
  extends BaseRepository 
  implements AdminRepository
{

  constructor(
    public readonly prisma: PrismaRepository) {
    super(prisma, 'administrador');
  }

  async save(data: AdminProps): Promise<any> {
    const accountDb = AdminMapper.toPrisma(data);

    return await this.prisma.administrador.create({
      data: accountDb,
    });
  }

  async update(cpf: string, data: Partial<AdminProps>): Promise<any> {
    const accountDb = AdminMapper.toPrisma(data);

    return await this.prisma.administrador.update({
      where: { cpf: String(cpf) },
      data: accountDb,
    });
  }

  async findByCpf(cpf: string): Promise<any> {

    return await this.prisma.administrador.findUnique({
      where: {
        cpf,
      },
    });
  }	

  async findById(id: number): Promise<any> {
    return await this.prisma.administrador.findFirst({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<any> {
    return await this.prisma.administrador.findFirst({
      where: {
        email,
      },
    });
  }

  async findAll(): Promise<any> {
    return await this.prisma.administrador.findMany();
  }

  async deleteByCpf(cpf: string): Promise<any> {
    return await this.prisma.administrador.delete({
      where: {
        cpf,
      },
    });
  }
  
}
