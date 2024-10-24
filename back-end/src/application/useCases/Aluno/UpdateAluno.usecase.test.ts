import { UpdateAlunoUsecase } from './UpdateAluno.usecase';
import { PrismaAlunoRepository } from '@infra/database/prisma/repositories/AlunoRepository';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { AlunoOrientadoProps } from '@domain/entities/AlunoOrientado';
import { mockAlunoCompleto } from '@helpers/__mocks__/AlunoUseCase.mocks';
import { HttpStatus } from '@nestjs/common';

const constant = getConstants();

describe('UpdateAlunoUsecase', () => {
  let updateAlunoUsecase: UpdateAlunoUsecase;
  let repository: PrismaAlunoRepository;

  beforeEach(() => {
    repository = {
      findByRa: jest.fn(),
      update: jest.fn(),
    } as any;
    updateAlunoUsecase = new UpdateAlunoUsecase(repository);
  });

  it('should update an aluno successfully', async () => {
    const ra = '123456';
    const aluno: AlunoOrientadoProps = mockAlunoCompleto;
    const updatedAluno = { ...aluno, nome: 'Updated Name' };

    (repository.findByRa as jest.Mock).mockResolvedValue(aluno);
    (repository.update as jest.Mock).mockResolvedValue(updatedAluno);

    const result = await updateAlunoUsecase.execute(ra, updatedAluno);

    expect(result).toEqual(updatedAluno);
    expect(repository.findByRa).toHaveBeenCalledWith(ra);
    expect(repository.update).toHaveBeenCalledWith(ra, updatedAluno);
  });

  it('should throw error if RA is not found', async () => {
    const ra = '123456';
    const aluno: AlunoOrientadoProps = mockAlunoCompleto;

    (repository.findByRa as jest.Mock).mockResolvedValue(null);

    await expect(updateAlunoUsecase.execute(ra, aluno)).rejects.toThrow(AppError);
    expect(repository.findByRa).toHaveBeenCalledWith(ra);
    expect(repository.update).not.toHaveBeenCalled();
  });

  it('should throw internal server error if repository update fails', async () => {
    const ra = '123456';
    const aluno: AlunoOrientadoProps = mockAlunoCompleto;

    (repository.findByRa as jest.Mock).mockResolvedValue(aluno);
    (repository.update as jest.Mock).mockRejectedValue(new AppError(constant.ALUNO.UPDATE.ERRO, HttpStatus.NOT_FOUND.toString()));

    await expect(updateAlunoUsecase.execute(ra, aluno)).rejects.toThrow(AppError);
    expect(repository.findByRa).toHaveBeenCalledWith(ra);
    expect(repository.update).toHaveBeenCalledWith(ra, aluno);
  });
});