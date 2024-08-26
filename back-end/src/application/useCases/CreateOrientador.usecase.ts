import { OrientadorRepository } from '@domain/repositories/Orientador.repository';
import { Injectable } from '@nestjs/common';
import { ProfessorOrientadorProps } from '@domain/entities/ProfessorOrientador';

@Injectable()
export class CreateOrientadorUseCase {
    constructor(
        private repository: OrientadorRepository,
    ) {}

    async execute(orientador: ProfessorOrientadorProps) {
        return await this.repository.save(orientador);

    }

}