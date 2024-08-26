import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorOrientadorController } from './professor-orientador.controller';

describe('ProfessorOrientadorController', () => {
  let controller: ProfessorOrientadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessorOrientadorController],
    }).compile();

    controller = module.get<ProfessorOrientadorController>(ProfessorOrientadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
