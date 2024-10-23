import { DeleteTrabalhoUseCase } from './DeleteTrabalho.usecase';
import { PrismaTrabalhoRepository } from '@infra/database/prisma/repositories/TrabalhoRepository';
import { TrabalhoMapper } from '@infra/database/prisma/mappers/Trabalho.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { trabalhoMockCompleto } from '@helpers/__mocks__/TrabalhoUseCase.mocks';

const constant = getConstants();

describe('DeleteTrabalhoUseCase', () => {
  let deleteTrabalhoUseCase: DeleteTrabalhoUseCase;
  let repository: PrismaTrabalhoRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      deleteById: jest.fn(),
    } as any;
    deleteTrabalhoUseCase = new DeleteTrabalhoUseCase(repository);
  });

  it('should delete a trabalho successfully', async () => {
    const id = 1;
    const data = trabalhoMockCompleto;
    const response = TrabalhoMapper.toGET(data);

    (repository.findById as jest.Mock).mockResolvedValue(data);
    jest.spyOn(TrabalhoMapper, 'toGET').mockReturnValue(response);
    (repository.deleteById as jest.Mock).mockResolvedValue(response);

    const result = await deleteTrabalhoUseCase.execute(id);

    expect(result).toEqual(response);
    expect(repository.findById).toHaveBeenCalledWith(id);
    expect(TrabalhoMapper.toGET).toHaveBeenCalledWith(data);
    expect(repository.deleteById).toHaveBeenCalledWith(id);
  });

  it('should throw error if ID is not found', async () => {
    const id = 1;

    (repository.findById as jest.Mock).mockResolvedValue(null);

    await expect(deleteTrabalhoUseCase.execute(id)).rejects.toThrow(AppError);
    expect(repository.findById).toHaveBeenCalledWith(id);
    expect(TrabalhoMapper.toGET).not.toHaveBeenCalled();
    expect(repository.deleteById).not.toHaveBeenCalled();
  });

  it('should throw error if mapper fails', async () => {
    const id = 1;
    const data = trabalhoMockCompleto;

    (repository.findById as jest.Mock).mockResolvedValue(data);
    jest.spyOn(TrabalhoMapper, 'toGET').mockReturnValue(null);

    await expect(deleteTrabalhoUseCase.execute(id)).rejects.toThrow(AppError);
    expect(repository.findById).toHaveBeenCalledWith(id);
    expect(TrabalhoMapper.toGET).toHaveBeenCalledWith(data);
    expect(repository.deleteById).not.toHaveBeenCalled();
  });
});