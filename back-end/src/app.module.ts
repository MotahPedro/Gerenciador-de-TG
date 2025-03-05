import { Module } from '@nestjs/common';
import { CreateOrientadorUseCase } from '@application/useCases/Orientador/CreateOrientador.usecase';
import { GetOrientadorUseCase } from '@application/useCases/Orientador/GetOrientador.usecase';
import { GetTodosOrientadoresUseCase } from '@application/useCases/Orientador/GetTodosOrientadores';
import { ProfessorOrientadorController } from '@infra/http/controllers/professor-orientador.controller';
import { UpdateOrientadorUseCase } from '@application/useCases/Orientador/UpdateOrientador.usecase';
import { DeleteOrientadorUseCase } from '@application/useCases/Orientador/DeleteOrientador.usecase';
import { RepositoriesModule } from '@infra/database/prisma/repositories.module';
import { CreateAlunosUseCase } from '@application/useCases/Aluno/CreateAluno.usecase';
import { GetAlunoUseCase } from '@application/useCases/Aluno/GetAluno.usecase';
import { GetTodosAlunoUseCase } from '@application/useCases/Aluno/GetTodosAlunos.usecase';
import { UpdateAlunoUsecase } from '@application/useCases/Aluno/UpdateAluno.usecase';
import { DeleteAlunoUseCase } from '@application/useCases/Aluno/DeleteAluno.usecase';
import { AlunoOrientadoController } from '@infra/http/controllers/alunos-orientados.controller';
import { CreateTrabalhoUseCase } from '@application/useCases/Trabalhos/CreateTrabalho.usecase';
import { GetTrabalhoUseCase } from '@application/useCases/Trabalhos/GetTrabalho.usecase';
import { GetTodosTrabalhosUseCase } from '@application/useCases/Trabalhos/GetTodosTrabalhos';
import { DeleteTrabalhoUseCase } from '@application/useCases/Trabalhos/DeleteTrabalho.usecase';
import { UpdateTrabalhoUseCase } from '@application/useCases/Trabalhos/UpdateTrabalho.usecase';
import { TrabalhoController } from '@infra/http/controllers/trabalhos.controller';
import { CreateLinhaUseCase } from '@application/useCases/LinhaOrientacao/CreateLinha.usecase';
// proximos imports de linha
import { LinhaController } from '@infra/http/controllers/linha.controller';

@Module({
  imports: [RepositoriesModule],
  providers: [
    CreateOrientadorUseCase,
    GetOrientadorUseCase,
    GetTodosOrientadoresUseCase,
    UpdateOrientadorUseCase,
    DeleteOrientadorUseCase,
    CreateAlunosUseCase,
    GetAlunoUseCase,
    GetTodosAlunoUseCase,
    UpdateAlunoUsecase,
    DeleteAlunoUseCase,
    CreateTrabalhoUseCase,
    GetTrabalhoUseCase,
    GetTodosTrabalhosUseCase,
    DeleteTrabalhoUseCase,
    UpdateTrabalhoUseCase,
    CreateLinhaUseCase,
    // Proximos metodos de linha
  ],
  controllers: [
    ProfessorOrientadorController,
    AlunoOrientadoController,
    TrabalhoController,
    LinhaController,
  ]
})
export class AppModule { }
