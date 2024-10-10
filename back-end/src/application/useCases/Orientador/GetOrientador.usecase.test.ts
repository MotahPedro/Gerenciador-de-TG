import { GetOrientadorUseCase } from './GetOrientador.usecase';
import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';
import { OrientadorMapper } from '@infra/database/prisma/mappers/Orientador.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';

const constant = getConstants();

describe('GetOrientadorUseCase', () => {
  let getOrientadorUseCase: GetOrientadorUseCase;
  let repository: PrismaOrientadorRepository;

  beforeEach(() => {
    repository = {
      findByCpf: jest.fn(),
    } as any;
    getOrientadorUseCase = new GetOrientadorUseCase(repository);
  });

  it('should retrieve an orientador successfully', async () => {
    const cpf = '12345678900';
    const data = { cpf, nome: 'John Doe' };
    const response = { cpf, nome: 'John Doe' };

    (repository.findByCpf as jest.Mock).mockResolvedValue(data);
    jest.spyOn(OrientadorMapper, 'toGET').mockReturnValue(response);

    const result = await getOrientadorUseCase.execute(cpf);

    expect(result).toEqual(response);
    expect(repository.findByCpf).toHaveBeenCalledWith(cpf);
    expect(OrientadorMapper.toGET).toHaveBeenCalledWith(data);
  });

  it('should throw error if CPF is not found', async () => {
    const cpf = '12345678900';

    (repository.findByCpf as jest.Mock).mockResolvedValue(null);

    await expect(getOrientadorUseCase.execute(cpf)).rejects.toThrow(AppError);
    expect(repository.findByCpf).toHaveBeenCalledWith(cpf);
    expect(OrientadorMapper.toGET).not.toHaveBeenCalled();
  });

  it('should throw error if mapper fails', async () => {
    const cpf = '12345678900';
    const data = { cpf, nome: 'John Doe' };

    (repository.findByCpf as jest.Mock).mockResolvedValue(data);
    jest.spyOn(OrientadorMapper, 'toGET').mockReturnValue(null);

    await expect(getOrientadorUseCase.execute(cpf)).rejects.toThrow(AppError);
    expect(repository.findByCpf).toHaveBeenCalledWith(cpf);
    expect(OrientadorMapper.toGET).toHaveBeenCalledWith(data);
  });
});