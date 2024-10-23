import { GetTrabalhoUseCase } from './GetTrabalho.usecase';
import { PrismaTrabalhoRepository } from '@infra/database/prisma/repositories/TrabalhoRepository';
import { TrabalhoMapper } from '@infra/database/prisma/mappers/Trabalho.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { trabalhoMockCompleto } from '@helpers/__mocks__/TrabalhoUseCase.mocks';

const constant = getConstants();

describe('GetTrabalhoUseCase', () => {
  let getTrabalhoUseCase: GetTrabalhoUseCase;
  let repository: PrismaTrabalhoRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;
    getTrabalhoUseCase = new GetTrabalhoUseCase(repository);
  });

  it('should retrieve a trabalho successfully', async () => {
    const id = 1;
    const data = trabalhoMockCompleto;
    const response = TrabalhoMapper.toGET(data);

    (repository.findById as jest.Mock).mockResolvedValue(data);
    jest.spyOn(TrabalhoMapper, 'toGET').mockReturnValue(response);

    const result = await getTrabalhoUseCase.execute(id);

    expect(result).toEqual(response);
    expect(repository.findById).toHaveBeenCalledWith(id);
    expect(TrabalhoMapper.toGET).toHaveBeenCalledWith(data);
  });

  it('should throw error if ID is not found', async () => {
    const id = 1;

    (repository.findById as jest.Mock).mockResolvedValue(null);

    await expect(getTrabalhoUseCase.execute(id)).rejects.toThrow(AppError);
    expect(repository.findById).toHaveBeenCalledWith(id);
    expect(TrabalhoMapper.toGET).not.toHaveBeenCalled();
  });

  it('should throw error if mapper fails', async () => {
    const id = 1;
    const data = trabalhoMockCompleto;

    (repository.findById as jest.Mock).mockResolvedValue(data);
    jest.spyOn(TrabalhoMapper, 'toGET').mockReturnValue(null);

    await expect(getTrabalhoUseCase.execute(id)).rejects.toThrow(AppError);
    expect(repository.findById).toHaveBeenCalledWith(id);
    expect(TrabalhoMapper.toGET).toHaveBeenCalledWith(data);
  });
});