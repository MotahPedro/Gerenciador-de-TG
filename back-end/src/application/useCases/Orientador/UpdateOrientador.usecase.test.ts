import { UpdateOrientadorUseCase } from './UpdateOrientador.usecase';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { HttpStatus } from '@nestjs/common';
import { mockOrientadorCompleto } from '@helpers/__mocks__/OrientadorUseCase.mocks';

const constant = getConstants();

describe('UpdateOrientadorUseCase', () => {
  let updateOrientadorUseCase: UpdateOrientadorUseCase;
  let repository: PrismaOrientadorRepository;

  beforeEach(() => {
    repository = {
      findByCpf: jest.fn(),
      update: jest.fn(),
    } as any;
    updateOrientadorUseCase = new UpdateOrientadorUseCase(repository);
  });

  it('should update an orientador successfully', async () => {
    const cpf = '12345678900';

    const updatedOrientador = { ...mockOrientadorCompleto, nome: 'Updated Name' };

    (repository.findByCpf as jest.Mock).mockResolvedValue(mockOrientadorCompleto);
    (repository.update as jest.Mock).mockResolvedValue(updatedOrientador);

    const result = await updateOrientadorUseCase.execute(cpf, updatedOrientador);

    expect(result).toEqual(updatedOrientador);
    expect(repository.findByCpf).toHaveBeenCalledWith(cpf);
    expect(repository.update).toHaveBeenCalledWith(cpf, updatedOrientador);
  });

  it('should throw error if CPF is not found', async () => {
    const cpf = '12345678900';

    (repository.findByCpf as jest.Mock).mockResolvedValue(null);

    await expect(updateOrientadorUseCase.execute(cpf, mockOrientadorCompleto)).rejects.toThrow(AppError);
    expect(repository.findByCpf).toHaveBeenCalledWith(cpf);
    expect(repository.update).not.toHaveBeenCalled();
  });

  it('should throw internal server error if repository update fails', async () => {
    const cpf = '12345678900';

    (repository.findByCpf as jest.Mock).mockResolvedValue(mockOrientadorCompleto);
    (repository.update as jest.Mock).mockRejectedValue(new AppError(constant.ORIENTADOR.UPDATE.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString()));

    await expect(updateOrientadorUseCase.execute(cpf, mockOrientadorCompleto)).rejects.toThrow(AppError);
    expect(repository.findByCpf).toHaveBeenCalledWith(cpf);
    expect(repository.update).toHaveBeenCalledWith(cpf, mockOrientadorCompleto);
  });
});