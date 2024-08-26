import { Module } from '@nestjs/common';
import { CreateOrientadorUseCase } from '@application/useCases/CreateOrientador.usecase'; 
import { GetOrientadorUseCase } from '@application/useCases/GetOrientador.usecase';
import { ProfessorOrientadorController } from '@infra/http/controllers/professor-orientador.controller'; 

@Module({
  providers: [
    CreateOrientadorUseCase,
    GetOrientadorUseCase,    
],
  controllers: [ProfessorOrientadorController]
})
export class AppModule {}
