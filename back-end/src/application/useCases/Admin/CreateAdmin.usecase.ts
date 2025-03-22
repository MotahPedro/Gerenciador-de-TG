import { Injectable, HttpStatus } from '@nestjs/common';
import { AdminProps } from '@domain/entities/Admin';
import { AdminMapper } from '@infra/database/prisma/mappers/Admin.mapper';
import AppError from '@helpers/errors/AppError';
import getConstants from '@helpers/constants/getConstants';
import { PrismaAdminRepository } from '@infra/database/prisma/repositories/AdminRepository';
import * as bcrypt from 'bcrypt';

const constant = getConstants()

@Injectable()
export class CreateAdminUseCase {
    constructor(
        private readonly repository: PrismaAdminRepository,
    ) { }

    async execute(admin: AdminProps) {

        if (admin.chave !== process.env.CREATE_ADMIN_KEY) {
            throw new AppError(
                constant.ADMIN.KEY_ERROR,
                HttpStatus.INTERNAL_SERVER_ERROR.toString()
            );
        }

        await this.validadeAdmin(admin);

        admin.senha = await this.hashPassword(admin.senha);

        const prismaAdmin = AdminMapper.toPrisma(admin);

        try {
            const adminSalvo = await this.repository.save(prismaAdmin);
            return AdminMapper.toDomain(adminSalvo);
        } catch (error) {
            throw new AppError(
                constant.ADMIN.INTERNAL + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR.toString()
            );
        }

    }

    private async validadeAdmin(admin: AdminProps) {
        const requiredFields = ['cpf', 'nome', 'email', 'senha', 'cargo', 'chave'];

        admin.cargo = admin.cargo.toLowerCase() === 'administrador' ? 'Administrador' : admin.cargo;

        if(admin.cargo !== 'Administrador') {
            throw new AppError(constant.ADMIN.CARGO, HttpStatus.BAD_REQUEST.toString());
        }

        for (const field of requiredFields) {
            if (!admin[field]) {
                throw new AppError(constant.ADMIN.VALIDADE, HttpStatus.BAD_REQUEST.toString());
            }
        }

        const existingCpf = await this.repository.findByCpf(admin.cpf);
        if (existingCpf) {
            throw new AppError(constant.ADMIN.CPF, HttpStatus.BAD_REQUEST.toString());
        }

        const existingEmail = await this.repository.findByEmail(admin.email);
        if (existingEmail) {
            throw new AppError(constant.ADMIN.EMAIL, HttpStatus.BAD_REQUEST.toString());
        }
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
}