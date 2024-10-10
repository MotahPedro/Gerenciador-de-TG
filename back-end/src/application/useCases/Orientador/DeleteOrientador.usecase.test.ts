import { DeleteOrientadorUseCase } from './DeleteOrientador.usecase';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';

const constant = getConstants();

describe('DeleteOrientadorUseCase', () => {
  let deleteOrientadorUseCase: DeleteOrientadorUseCase;
  let repository: PrismaOrientadorRepository;

  beforeEach(() => {
    repository = {
      findByCpf: jest.fn(),
      deleteByCpf: jest.fn(),
    } as any;
    deleteOrientadorUseCase = new DeleteOrientadorUseCase(repository);
  });

  it('should delete an orientador successfully', async () => {
    const cpf = '12345678900';
    (repository.findByCpf as jest.Mock).mockResolvedValue({ cpf });

    await deleteOrientadorUseCase.execute(cpf);

    expect(repository.findByCpf).toHaveBeenCalledWith(cpf);
    expect(repository.deleteByCpf).toHaveBeenCalledWith(cpf);
  });

  it('should throw error if CPF is not found', async () => {
    const cpf = '12345678900';
    (repository.findByCpf as jest.Mock).mockResolvedValue(null);

    await expect(deleteOrientadorUseCase.execute(cpf)).rejects.toThrow(AppError);
    expect(repository.findByCpf).toHaveBeenCalledWith(cpf);
    expect(repository.deleteByCpf).not.toHaveBeenCalled();
  });

  it('should throw error if CPF is empty', async () => {
    const cpf = '';

    await expect(deleteOrientadorUseCase.execute(cpf)).rejects.toThrow(AppError);
    expect(repository.findByCpf).not.toHaveBeenCalled();
    expect(repository.deleteByCpf).not.toHaveBeenCalled();
  });
});