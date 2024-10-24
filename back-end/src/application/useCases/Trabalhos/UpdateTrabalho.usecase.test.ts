import { UpdateTrabalhoUseCase } from './UpdateTrabalho.usecase';
import { PrismaTrabalhoRepository } from '@infra/database/prisma/repositories/TrabalhoRepository';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { TrabalhoProps } from '@domain/entities/Trabalhos';
import { HttpStatus } from '@nestjs/common';

const constant = getConstants();

describe('UpdateTrabalhoUseCase', () => {
  let updateTrabalhoUseCase: UpdateTrabalhoUseCase;
  let repository: PrismaTrabalhoRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      update: jest.fn(),
    } as any;
    updateTrabalhoUseCase = new UpdateTrabalhoUseCase(repository);
  });

  it('should update a trabalho successfully', async () => {
    const id = 1;
    const trabalho: TrabalhoProps = {
      tema: 'Desenvolvimento de Software',
      objetivo: 'Criar um sistema de gestão',
      questaoProblema: 'Como melhorar a eficiência do desenvolvimento de software?',
    };
    const updatedTrabalho = { ...trabalho, tema: 'Updated Tema' };

    (repository.findById as jest.Mock).mockResolvedValue(trabalho);
    (repository.update as jest.Mock).mockResolvedValue(updatedTrabalho);

    const result = await updateTrabalhoUseCase.execute(id, updatedTrabalho);

    expect(result).toEqual(updatedTrabalho);
    expect(repository.findById).toHaveBeenCalledWith(id);
    expect(repository.update).toHaveBeenCalledWith(id, updatedTrabalho);
  });

  it('should throw error if ID is not found', async () => {
    const id = 1;
    const trabalho: TrabalhoProps = {
      tema: 'Desenvolvimento de Software',
      objetivo: 'Criar um sistema de gestão',
      questaoProblema: 'Como melhorar a eficiência do desenvolvimento de software?',
    };

    (repository.findById as jest.Mock).mockResolvedValue(null);

    await expect(updateTrabalhoUseCase.execute(id, trabalho)).rejects.toThrow(AppError);
    expect(repository.findById).toHaveBeenCalledWith(id);
    expect(repository.update).not.toHaveBeenCalled();
  });

  it('should throw internal server error if repository update fails', async () => {
    const id = 1;
    const trabalho: TrabalhoProps = {
      tema: 'Desenvolvimento de Software',
      objetivo: 'Criar um sistema de gestão',
      questaoProblema: 'Como melhorar a eficiência do desenvolvimento de software?',
    };

    (repository.findById as jest.Mock).mockResolvedValue(trabalho);
    (repository.update as jest.Mock).mockRejectedValue(new AppError(constant.TRABALHO.UPDATE.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString()));

    await expect(updateTrabalhoUseCase.execute(id, trabalho)).rejects.toThrow(AppError);
    expect(repository.findById).toHaveBeenCalledWith(id);
    expect(repository.update).toHaveBeenCalledWith(id, trabalho);
  });
});