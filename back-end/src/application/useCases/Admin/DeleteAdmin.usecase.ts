import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaAdminRepository } from '@infra/database/prisma/repositories/AdminRepository';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';

const constant = getConstants();

@Injectable()
export class DeleteAdminUseCase {
    constructor(private repository: PrismaAdminRepository) {}

    async execute(cpf: string): Promise<void> {
        const existingAdmin = await this.repository.findByCpf(cpf);

        if (!existingAdmin) {
            throw new AppError(constant.ADMIN.GET_CPF.ERRO, HttpStatus.NOT_FOUND.toString());
        }

        await this.repository.deleteByCpf(cpf);
    }
}
