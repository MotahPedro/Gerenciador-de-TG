import { Module } from '@nestjs/common';
import { CreateOrientadorUseCase } from '@application/useCases/Orientador/CreateOrientador.usecase';
import { GetOrientadorUseCase } from '@application/useCases/Orientador/GetOrientador.usecase';
import { GetTodosOrientadoresUseCase } from '@application/useCases/Orientador/GetTodosOrientadores';
import { UpdateOrientadorUseCase } from '@application/useCases/Orientador/UpdateOrientador.usecase';
import { DeleteOrientadorUseCase } from '@application/useCases/Orientador/DeleteOrientador.usecase';
import { RepositoriesModule } from '@infra/database/prisma/repositories.module';
import { CreateAlunosUseCase } from '@application/useCases/Aluno/CreateAluno.usecase';
import { GetAlunoUseCase } from '@application/useCases/Aluno/GetAluno.usecase';
import { GetTodosAlunoUseCase } from '@application/useCases/Aluno/GetTodosAlunos.usecase';
import { UpdateAlunoUsecase } from '@application/useCases/Aluno/UpdateAluno.usecase';
import { DeleteAlunoUseCase } from '@application/useCases/Aluno/DeleteAluno.usecase';
import { CreateTrabalhoUseCase } from '@application/useCases/Trabalhos/CreateTrabalho.usecase';
import { GetTrabalhoUseCase } from '@application/useCases/Trabalhos/GetTrabalho.usecase';
import { GetTodosTrabalhosUseCase } from '@application/useCases/Trabalhos/GetTodosTrabalhos';
import { DeleteTrabalhoUseCase } from '@application/useCases/Trabalhos/DeleteTrabalho.usecase';
import { UpdateTrabalhoUseCase } from '@application/useCases/Trabalhos/UpdateTrabalho.usecase';
import { CreateLinhaUseCase } from '@application/useCases/LinhaOrientacao/CreateLinha.usecase';
import { GetLinhaUseCase } from '@application/useCases/LinhaOrientacao/GetLinha.usecase';
import { GetTodasLinhasUseCase } from '@application/useCases/LinhaOrientacao/GetTodasLinhas.usecase';
import { UpdateLinhaUseCase } from '@application/useCases/LinhaOrientacao/UpdateLinha.usecase';
import { DeleteLinhaUseCase } from '@application/useCases/LinhaOrientacao/deleteLinha.usecase';
import { CreateCursoUseCase } from '@application/useCases/CursoAtuacao/CreateCurso.usecase';
import { GetCursoUseCase } from '@application/useCases/CursoAtuacao/GetCurso.usecase';
import { GetTodosCursosUseCase } from '@application/useCases/CursoAtuacao/GetTodosCursos';
import { UpdateCursoUseCase } from '@application/useCases/CursoAtuacao/UpdateCurso.usecase';
import { DeleteCursoUseCase } from '@application/useCases/CursoAtuacao/DeleteCurso.usecase';
import { AuthModule } from '@infra/http/auth/auth.module';
import { CreateAdminUseCase } from '@application/useCases/Admin/CreateAdmin.usecase';
import { GetAdminUseCase } from '@application/useCases/Admin/GetAdmin.usecase';
import { LoginLogoutUseCase } from '@application/useCases/Admin/Login-Logout.usecase';

@Module({
    imports: [
        AuthModule,
        RepositoriesModule
    ],
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
        GetLinhaUseCase,
        GetTodasLinhasUseCase,
        UpdateLinhaUseCase,
        DeleteLinhaUseCase,
        CreateCursoUseCase,
        GetCursoUseCase,
        GetTodosCursosUseCase,
        UpdateCursoUseCase,
        DeleteCursoUseCase,
        CreateAdminUseCase,
        GetAdminUseCase,
        LoginLogoutUseCase,
    ],
    exports: [
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
        GetLinhaUseCase,
        GetTodasLinhasUseCase,
        UpdateLinhaUseCase,
        DeleteLinhaUseCase,
        CreateCursoUseCase,
        GetCursoUseCase,
        GetTodosCursosUseCase,
        UpdateCursoUseCase,
        DeleteCursoUseCase,
        CreateAdminUseCase,
        GetAdminUseCase,
        LoginLogoutUseCase,
    ]
})
export class ApplicationModule { }