import { HttpStatus, Injectable } from '@nestjs/common';
import { AdminProps } from '@domain/entities/Admin';
import { PrismaAdminRepository } from '@infra/database/prisma/repositories/AdminRepository';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';

const constant = getConstants();

@Injectable()
export class GetTodosAdminsUseCase {
    constructor(private repository: PrismaAdminRepository) {}

    async execute(): Promise<AdminProps[]> {
        const data = await this.repository.findAll();

        if (!data || data.length === 0) {
            throw new AppError(constant.ADMIN.GET_ALL.ERRO, HttpStatus.NOT_FOUND.toString());
        }

        return data.map(admin => ({
            ...admin,
        }));
    }
}
