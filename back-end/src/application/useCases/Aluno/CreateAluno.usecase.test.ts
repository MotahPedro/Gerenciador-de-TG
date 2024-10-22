import { CreateAlunoUseCase } from './CreateAluno.usecase';
import { PrismaAlunoRepository } from '@infra/database/prisma/repositories/AlunoRepository';
import { AlunoMapper } from '@infra/database/prisma/mappers/Aluno.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { mockAlunoCompleto, mockAlunoVazio } from '@helpers/__mocks__/AlunoUseCase.mocks';

const constant = getConstants();

describe('CreateAlunoUseCase', () => {
  let createAlunoUseCase: CreateAlunoUseCase;
  let repository: PrismaAlunoRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findByRa: jest.fn(),
      findByEmail: jest.fn(),
    } as any;
    createAlunoUseCase = new CreateAlunoUseCase(repository);
  });

  it('should create an aluno successfully', async () => {

    const prismaAluno = AlunoMapper.toPrisma(mockAlunoCompleto);
    const savedAluno = { ...prismaAluno, id: 1 };

    (repository.save as jest.Mock).mockResolvedValue(savedAluno);

    const result = await createAlunoUseCase.execute(mockAlunoCompleto);

    expect(result).toEqual(AlunoMapper.toDomain(savedAluno));
    expect(repository.save).toHaveBeenCalledWith(prismaAluno);
  });

  it('should throw validation error if required fields are missing', async () => {

    await expect(createAlunoUseCase.execute(mockAlunoVazio)).rejects.toThrow(AppError);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should throw error if RA already exists', async () => {

    (repository.findByRa as jest.Mock).mockResolvedValue(mockAlunoCompleto);

    await expect(createAlunoUseCase.execute(mockAlunoCompleto)).rejects.toThrow(AppError);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should throw error if email already exists', async () => {

    (repository.findByEmail as jest.Mock).mockResolvedValue(mockAlunoCompleto);

    await expect(createAlunoUseCase.execute(mockAlunoCompleto)).rejects.toThrow(AppError);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should throw internal server error if repository save fails', async () => {

    const prismaAluno = AlunoMapper.toPrisma(mockAlunoCompleto);

    (repository.save as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(createAlunoUseCase.execute(mockAlunoCompleto)).rejects.toThrow(AppError);
    expect(repository.save).toHaveBeenCalledWith(prismaAluno);
  });
});