import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { OrientadorRepository } from '@domain/repositories/Orientador.repository';
import { Injectable } from '@nestjs/common';
import { ProfessorOrientadorProps } from '@domain/entities/ProfessorOrientador';

@Injectable()
export class PrismaOrientadorRepository extends OrientadorRepository {
  constructor(private readonly prisma: PrismaRepository) {
    super();
  }

  async save(orientador: ProfessorOrientadorProps): Promise<any> {
    return await this.prisma.professorOrientador.create({

    // esses dados devem ser separados depois para um mapper
      data: {
        cpf: orientador.cpf,
        nome: orientador.nome,
        email: orientador.email,
        quantidadeInstituicoes: orientador.quantidadeInstituicoes,
        quantidadeAlunos: orientador.quantidadeAlunos,
        linhasOrientacao: {
          create: orientador.linhasOrientacao.map(linha => ({
            linha,
          })),
        },
        cursosAtuacao: {
          create: orientador.cursosAtuacao.map(curso => ({
            curso,
          })),
        },
        alunosOrientados: {
        },
      },
    });
  }

  // async update

  // async findBySubscriberId

}
