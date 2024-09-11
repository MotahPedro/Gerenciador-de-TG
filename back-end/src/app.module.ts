import { Module } from '@nestjs/common';
import { CreateOrientadorUseCase } from '@application/useCases/CreateOrientador.usecase'; 
import { GetOrientadorUseCase } from '@application/useCases/GetOrientador.usecase';
import { ProfessorOrientadorController } from '@infra/http/controllers/professor-orientador.controller'; 
import { RepositoriesModule } from '@infra/database/prisma/repositories.module';
import { DeleteOrientadorUseCase } from '@application/useCases/DeleteOrientador.usecase';

@Module({
  imports: [RepositoriesModule],
  providers: [
    CreateOrientadorUseCase,
    GetOrientadorUseCase,    
    DeleteOrientadorUseCase,
],
  controllers: [ProfessorOrientadorController]
})
export class AppModule {}
