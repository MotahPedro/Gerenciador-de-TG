import { Module } from '@nestjs/common';
import { CreateOrientadorUseCase } from '@application/useCases/Orientador/CreateOrientador.usecase'; 
import { GetOrientadorUseCase } from '@application/useCases/Orientador/GetOrientador.usecase';
import { ProfessorOrientadorController } from '@infra/http/controllers/professor-orientador.controller'; 
import { UpdateOrientadorUseCase } from '@application/useCases/Orientador/UpdateOrientador.usecase';
import { DeleteOrientadorUseCase } from '@application/useCases/Orientador/DeleteOrientador.usecase';
import { RepositoriesModule } from '@infra/database/prisma/repositories.module';
import { CreateAlunoUseCase } from '@application/useCases/Aluno/CreateAluno.usecase';
import { GetAlunoUseCase } from '@application/useCases/Aluno/GetAluno.usecase';
import { UpdateAlunoUsecase } from '@application/useCases/Aluno/UpdateAluno.usecase';
import { DeleteAlunoUseCase } from '@application/useCases/Aluno/DeleteAluno.usecase';
import { AlunoOrientadoController } from '@infra/http/controllers/alunos-orientados.controller';
import { CreateTrabalhoUseCase } from '@application/useCases/Trabalhos/CreateTrabalho.usecase';
import { GetTrabalhoUseCase } from '@application/useCases/Trabalhos/GetTrabalho.usecase';
import { DeleteTrabalhoUseCase } from '@application/useCases/Trabalhos/DeleteTrabalho.usecase';
import { UpdateTrabalhoUseCase } from '@application/useCases/Trabalhos/UpdateTrabalho.usecase';
import { TrabalhoController } from '@infra/http/controllers/trabalhos.controller';

@Module({
  imports: [RepositoriesModule],
  providers: [
    CreateOrientadorUseCase,
    GetOrientadorUseCase,
    UpdateOrientadorUseCase,  
    DeleteOrientadorUseCase,
    CreateAlunoUseCase,
    GetAlunoUseCase,
    UpdateAlunoUsecase,
    DeleteAlunoUseCase,
    CreateTrabalhoUseCase,
    GetTrabalhoUseCase,
    DeleteTrabalhoUseCase,
    UpdateTrabalhoUseCase,
],
  controllers: [
    ProfessorOrientadorController,
    AlunoOrientadoController,
    TrabalhoController,
  ]
})
export class AppModule {}
