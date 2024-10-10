import { CreateOrientadorUseCase } from './CreateOrientador.usecase';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';
import { OrientadorMapper } from '@infra/database/prisma/mappers/Orientador.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { mockOrientadorCompleto, mockOrientadorIncompleto } from '@helpers/__mocks__/CreateOrientadorUseCase.mocks';

const constant = getConstants();

describe('CreateOrientadorUseCase', () => {
  let createOrientadorUseCase: CreateOrientadorUseCase;
  let repository: PrismaOrientadorRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findByCpf: jest.fn(),
      findByEmail: jest.fn(),
    } as any;
    createOrientadorUseCase = new CreateOrientadorUseCase(repository);
  });

  it('should create an orientador successfully', async () => {
    const prismaOrientador = OrientadorMapper.toPrisma(mockOrientadorCompleto);
    const savedOrientador = { ...prismaOrientador, id: 1 };

    (repository.save as jest.Mock).mockResolvedValue(savedOrientador);

    const result = await createOrientadorUseCase.execute(mockOrientadorCompleto);

    expect(result).toEqual(OrientadorMapper.toDomain(savedOrientador));
    expect(repository.save).toHaveBeenCalledWith(prismaOrientador);
  });

  it('should throw validation error if required fields are missing', async () => {
    await expect(createOrientadorUseCase.execute(mockOrientadorIncompleto)).rejects.toThrow(AppError);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should throw error if CPF already exists', async () => {
    (repository.findByCpf as jest.Mock).mockResolvedValue(mockOrientadorCompleto);

    await expect(createOrientadorUseCase.execute(mockOrientadorCompleto)).rejects.toThrow(AppError);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should throw error if email already exists', async () => {
    (repository.findByEmail as jest.Mock).mockResolvedValue(mockOrientadorCompleto);

    await expect(createOrientadorUseCase.execute(mockOrientadorCompleto)).rejects.toThrow(AppError);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should throw internal server error if repository save fails', async () => {
    const prismaOrientador = OrientadorMapper.toPrisma(mockOrientadorCompleto);

    (repository.save as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(createOrientadorUseCase.execute(mockOrientadorCompleto)).rejects.toThrow(AppError);
    expect(repository.save).toHaveBeenCalledWith(prismaOrientador);
  });
});