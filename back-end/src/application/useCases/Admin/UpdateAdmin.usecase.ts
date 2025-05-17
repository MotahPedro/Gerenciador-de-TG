import { HttpStatus, Injectable } from '@nestjs/common';
import { AdminProps } from '@domain/entities/Admin';
import { PrismaAdminRepository } from '@infra/database/prisma/repositories/AdminRepository';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';

const constant = getConstants();

@Injectable()
export class UpdateAdminUseCase {
    constructor(private repository: PrismaAdminRepository) {}

    async execute(cpf: string, data: Partial<AdminProps>): Promise<AdminProps> {
        const existingAdmin = await this.repository.findByCpf(cpf);

        if (!existingAdmin) {
            throw new AppError(constant.ADMIN.UPDATE.ERRO, HttpStatus.NOT_FOUND.toString());
        }

        const updatedAdmin = await this.repository.update(cpf, data);

        if (!updatedAdmin) {
            throw new AppError(constant.ADMIN.UPDATE.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }

        return updatedAdmin;
    }
}
