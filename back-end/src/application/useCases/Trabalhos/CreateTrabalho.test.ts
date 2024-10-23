import { CreateTrabalhoUseCase } from './CreateTrabalho.usecase';
import { PrismaTrabalhoRepository } from '@infra/database/prisma/repositories/TrabalhoRepository';
import { TrabalhoMapper } from '@infra/database/prisma/mappers/Trabalho.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { TrabalhoProps } from '@domain/entities/Trabalhos';
import { trabalhoMockVazio, trabalhoMockCompleto } from '@helpers/__mocks__/TrabalhoUseCase.mocks';
import { HttpStatus } from '@nestjs/common';

const constant = getConstants();

describe('CreateTrabalhoUseCase', () => {
  let createTrabalhoUseCase: CreateTrabalhoUseCase;
  let repository: PrismaTrabalhoRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
    } as any;
    createTrabalhoUseCase = new CreateTrabalhoUseCase(repository);
  });

  it('should create a trabalho successfully', async () => {
    const mappedTrabalho = TrabalhoMapper.toGET(trabalhoMockCompleto);
    const savedTrabalho = { ...trabalhoMockCompleto, id: 1 };

    jest.spyOn(TrabalhoMapper, 'toGET').mockReturnValue(mappedTrabalho);
    (repository.save as jest.Mock).mockResolvedValue(savedTrabalho);

    const result = await createTrabalhoUseCase.execute(trabalhoMockCompleto);

    expect(result).toEqual(savedTrabalho);
    expect(TrabalhoMapper.toGET).toHaveBeenCalledWith(trabalhoMockCompleto);
    expect(repository.save).toHaveBeenCalledWith(trabalhoMockCompleto);
  });

  it('should throw error if mapper fails', async () => {
    jest.spyOn(TrabalhoMapper, 'toGET').mockReturnValue(null);

    await expect(createTrabalhoUseCase.execute(trabalhoMockCompleto)).rejects.toThrow(AppError);
    expect(TrabalhoMapper.toGET).toHaveBeenCalledWith(trabalhoMockCompleto);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should throw internal server error if repository save fails', async () => {
    const prismaTrabalho = TrabalhoMapper.toPrisma(trabalhoMockCompleto);

    jest.spyOn(TrabalhoMapper, 'toGET').mockReturnValue(prismaTrabalho);
    (repository.save as jest.Mock).mockRejectedValue(new AppError(constant.TRABALHO.CREATE_ERROR, HttpStatus.INTERNAL_SERVER_ERROR.toString()));

    await expect(createTrabalhoUseCase.execute(trabalhoMockCompleto)).rejects.toThrow(AppError);
    expect(TrabalhoMapper.toGET).toHaveBeenCalledWith(trabalhoMockCompleto);
    expect(repository.save).toHaveBeenCalledWith(prismaTrabalho);
  });
});