import { GetAlunoUseCase } from './GetAluno.usecase';
import { PrismaAlunoRepository } from '@infra/database/prisma/repositories/AlunoRepository';
import { AlunoMapper } from '@infra/database/prisma/mappers/Aluno.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { mockAlunoCompleto } from '@helpers/__mocks__/AlunoUseCase.mocks';

const constant = getConstants();

describe('GetAlunoUseCase', () => {
  let getOrientadorUseCase: GetAlunoUseCase;
  let repository: PrismaAlunoRepository;

  beforeEach(() => {
    repository = {
      findByRa: jest.fn(),
    } as any;
    getOrientadorUseCase = new GetAlunoUseCase(repository);
  });

  it('should retrieve an aluno successfully', async () => {
    const ra = '123456';
    const data = mockAlunoCompleto;
    const response = AlunoMapper.toGET(data);

    (repository.findByRa as jest.Mock).mockResolvedValue(data);
    jest.spyOn(AlunoMapper, 'toGET').mockReturnValue(response);

    const result = await getOrientadorUseCase.execute(ra);

    expect(result).toEqual(response);
    expect(repository.findByRa).toHaveBeenCalledWith(ra);
    expect(AlunoMapper.toGET).toHaveBeenCalledWith(data);
  });

  it('should throw error if RA is not found', async () => {
    const ra = '123456';

    (repository.findByRa as jest.Mock).mockResolvedValue(null);

    await expect(getOrientadorUseCase.execute(ra)).rejects.toThrow(AppError);
    expect(repository.findByRa).toHaveBeenCalledWith(ra);
    expect(AlunoMapper.toGET).not.toHaveBeenCalled();
  });

  it('should throw error if mapper fails', async () => {
    const ra = '123456';
    const data = mockAlunoCompleto;

    (repository.findByRa as jest.Mock).mockResolvedValue(data);
    jest.spyOn(AlunoMapper, 'toGET').mockReturnValue(null);

    await expect(getOrientadorUseCase.execute(ra)).rejects.toThrow(AppError);
    expect(repository.findByRa).toHaveBeenCalledWith(ra);
    expect(AlunoMapper.toGET).toHaveBeenCalledWith(data);
  });
});