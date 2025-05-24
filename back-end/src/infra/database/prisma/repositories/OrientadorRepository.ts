import { PrismaRepository } from '@infra/database/prisma/core/PrismaRepository';
import { OrientadorRepository } from '@domain/repositories/Orientador.repository';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ProfessorOrientadorProps } from '@domain/entities/ProfessorOrientador';
import { OrientadorMapper } from '../mappers/Orientador.mapper';
import { BaseRepository } from '../core/Base.repository';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { GetAlunoUseCase } from '@application/useCases/Aluno/GetAluno.usecase';

@Injectable()
export class PrismaOrientadorRepository
  extends BaseRepository
  implements OrientadorRepository {

  constructor(
    public readonly prisma: PrismaRepository,
    public readonly getAluno: GetAlunoUseCase,
  ) {
    super(prisma, 'professorOrientador');
  }

  async save(data: ProfessorOrientadorProps): Promise<any> {
    const accountDb = OrientadorMapper.toPrisma(data);

    return await this.prisma.professorOrientador.create({
      data: accountDb,
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

  async addAlunoOrientado(orientadorCpf: string, alunoOrientado: any): Promise<any> {
    const orientador = await this.prisma.professorOrientador.findUnique({
      where: { cpf: String(orientadorCpf) },
    });

    const constant = getConstants();

    if (!orientador) {
      throw new AppError(
        constant.ORIENTADOR.NOT_FOUND,
        HttpStatus.NOT_FOUND.toString()
      );
    }

    const alunosOrientadosDoOrientador: string[] = Array.isArray(orientador.alunosOrientados) ? orientador.alunosOrientados.map(ra => String(ra)) : [];

    const alunoOrientadoRa = alunoOrientado.alunoOrientado;
    const aluno = await this.getAluno.execute(alunoOrientadoRa)

    if (!aluno) {
      throw new AppError(
        constant.ALUNO.NOT_FOUND,
        HttpStatus.NOT_FOUND.toString()
      );
    }
    const alunoRA = aluno.matricula;

    const updatedOrientadorAlunos = alunosOrientadosDoOrientador.includes(alunoRA)
      ? alunosOrientadosDoOrientador
      : [...alunosOrientadosDoOrientador, alunoRA];

    const quantidadeAlunos = updatedOrientadorAlunos.length;

    const updatedOrientador = await this.prisma.professorOrientador.update({
      where: { cpf: String(orientadorCpf) },
      data: {
        alunosOrientados: updatedOrientadorAlunos,
        quantidadeAlunos: quantidadeAlunos,
      },
    });

    const updatedAluno = await this.prisma.alunoOrientado.update({
      where: { matricula: alunoRA },
      data: {
        professorOrientadorCpf: orientadorCpf,
      },
    });

    return { updatedOrientador, updatedAluno }
  }

  async removeAlunoOrientado(orientadorCpf: string, alunoOrientado: any): Promise<any> {
    const orientador = await this.prisma.professorOrientador.findUnique({
      where: { cpf: String(orientadorCpf) },
    });

    const constant = getConstants();

    if (!orientador) {
      throw new AppError(
        constant.ORIENTADOR.NOT_FOUND,
        HttpStatus.NOT_FOUND.toString()
      );
    }
    const alunosOrientadosDoOrientador: string[] = Array.isArray(orientador.alunosOrientados)
      ? orientador.alunosOrientados.map(ra => String(ra))
      : [];

    const alunoOrientadoRa = alunoOrientado.alunoOrientado;
    const aluno = await this.getAluno.execute(alunoOrientadoRa);

    if (!aluno || !alunosOrientadosDoOrientador.includes(aluno.matricula)) {
      throw new AppError(
      constant.ORIENTADOR.REMOVE_ALUNO.ALUNO_NAO_ORIENTADO,
      HttpStatus.BAD_REQUEST.toString()
      );
    }


    const updatedOrientadorAlunos = alunosOrientadosDoOrientador.filter(ra => ra !== alunoOrientadoRa);
    const quantidadeAlunos = updatedOrientadorAlunos.length;

    const updatedOrientador = await this.prisma.professorOrientador.update({
      where: { cpf: String(orientadorCpf) },
      data: {
        alunosOrientados: updatedOrientadorAlunos,
        quantidadeAlunos: quantidadeAlunos,
      },
    });

    const updatedAluno = await this.prisma.alunoOrientado.update({
      where: { matricula: alunoOrientadoRa },
      data: {
        professorOrientadorCpf: "",
      },
    });

    return { updatedOrientador, updatedAluno };
  }

}
