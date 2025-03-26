import { Module } from '@nestjs/common';
import { ProfessorOrientadorController } from '@infra/http/controllers/professor-orientador.controller';
import { RepositoriesModule } from '@infra/database/prisma/repositories.module';
import { AlunoOrientadoController } from '@infra/http/controllers/alunos-orientados.controller';
import { TrabalhoController } from '@infra/http/controllers/trabalhos.controller';
import { LinhaController } from '@infra/http/controllers/linha.controller';
import { CursoController } from '@infra/http/controllers/curso.controller';
import { AuthModule } from '@infra/http/auth/auth.module';
import { AdminController } from '@infra/http/controllers/admin.controller';
import { ApplicationModule } from '@application/application.module';

@Module({
  imports: [
    RepositoriesModule,
    AuthModule,
    ApplicationModule,
  ],
  controllers: [
    ProfessorOrientadorController,
    AlunoOrientadoController,
    TrabalhoController,
    LinhaController,
    CursoController,
    AdminController,
  ]
})
export class AppModule { }
