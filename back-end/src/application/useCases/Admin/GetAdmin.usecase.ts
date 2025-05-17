import { HttpStatus, Injectable } from '@nestjs/common';
import { AdminProps } from '@domain/entities/Admin';
import { AdminMapper } from '@infra/database/prisma/mappers/Admin.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaAdminRepository } from '@infra/database/prisma/repositories/AdminRepository';

const constant = getConstants()

@Injectable()
export class GetAdminUseCase {
    constructor(private repository: PrismaAdminRepository) {}

    async getByCpf(cpf: string): Promise<AdminProps> {
        const data = await this.repository.findByCpf(cpf);

        if (!data) {
            throw new AppError(constant.ADMIN.GET_CPF.ERRO, HttpStatus.NOT_FOUND.toString());
        }

        const response = AdminMapper.toGET(data);

        if (!response) {
            throw new AppError(constant.ADMIN.GET_CPF.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }

        return response;
    }

    async getByEmail(email: string): Promise<AdminProps> {
        const data = await this.repository.findByEmail(email);

        if (!data) {
            throw new AppError(constant.ADMIN.GET_CPF.ERRO, HttpStatus.NOT_FOUND.toString());
        }

        const response = AdminMapper.toGET(data);

        if (!response) {
            throw new AppError(constant.ADMIN.GET_CPF.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }

        return response;
    }
    
    async getById(id: number): Promise<AdminProps> {
        const data = await this.repository.findById(id);

        if (!data) {
            throw new AppError(constant.ADMIN.GET_CPF.ERRO, HttpStatus.NOT_FOUND.toString());
        }

        const response = AdminMapper.toGET(data);

        if (!response) {
            throw new AppError(constant.ADMIN.GET_CPF.ERRO, HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }

        return response;
    }
}
