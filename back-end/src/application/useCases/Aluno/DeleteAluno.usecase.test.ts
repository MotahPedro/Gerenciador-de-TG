import { DeleteAlunoUseCase } from './DeleteAluno.usecase';
import { PrismaAlunoRepository } from '@infra/database/prisma/repositories/AlunoRepository';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';

const constant = getConstants();

describe('DeleteAlunoUseCase', () => {
  let deleteAlunoUseCase: DeleteAlunoUseCase;
  let repository: PrismaAlunoRepository;

  beforeEach(() => {
    repository = {
      findByRa: jest.fn(),
      deleteByRa: jest.fn(),
    } as any;
    deleteAlunoUseCase = new DeleteAlunoUseCase(repository);
  });

  it('should delete an aluno successfully', async () => {
    const ra = '123456';
    (repository.findByRa as jest.Mock).mockResolvedValue({ ra });

    await deleteAlunoUseCase.execute(ra);

    expect(repository.findByRa).toHaveBeenCalledWith(ra);
    expect(repository.deleteByRa).toHaveBeenCalledWith(ra);
  });

  it('should throw error if RA is not found', async () => {
    const ra = '123456';
    (repository.findByRa as jest.Mock).mockResolvedValue(null);

    await expect(deleteAlunoUseCase.execute(ra)).rejects.toThrow(AppError);
    expect(repository.findByRa).toHaveBeenCalledWith(ra);
    expect(repository.deleteByRa).not.toHaveBeenCalled();
  });

  it('should throw error if RA is empty', async () => {
    const ra = '';

    await expect(deleteAlunoUseCase.execute(ra)).rejects.toThrow(AppError);
    expect(repository.findByRa).not.toHaveBeenCalled();
    expect(repository.deleteByRa).not.toHaveBeenCalled();
  });
});