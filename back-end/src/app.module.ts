import { Module } from '@nestjs/common';
import { CreateOrientadorUseCase } from '@application/useCases/Orientador/CreateOrientador.usecase'; 
import { GetOrientadorUseCase } from '@application/useCases/Orientador/GetOrientador.usecase';
import { ProfessorOrientadorController } from '@infra/http/controllers/professor-orientador.controller'; 
import { RepositoriesModule } from '@infra/database/prisma/repositories.module';
import { DeleteOrientadorUseCase } from '@application/useCases/Orientador/DeleteOrientador.usecase';
import { CreateAlunoUseCase } from '@application/useCases/Aluno/CreateAluno.usecase';
import { AlunoOrientadoController } from '@infra/http/controllers/alunos-orientados.controller';

@Module({
  imports: [RepositoriesModule],
  providers: [
    CreateOrientadorUseCase,
    GetOrientadorUseCase,    
    DeleteOrientadorUseCase,
    CreateAlunoUseCase,
],
  controllers: [
    ProfessorOrientadorController,
    AlunoOrientadoController]
})
export class AppModule {}
