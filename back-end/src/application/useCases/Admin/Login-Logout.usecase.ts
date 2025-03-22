import { Injectable, HttpStatus, Body, Res } from '@nestjs/common';
import { PrismaAdminRepository } from '@infra/database/prisma/repositories/AdminRepository';
import AppError from '@helpers/errors/AppError';
import { AdminLoginProps, AdminProps } from '@domain/entities/Admin';
import { JwtUtils } from '@helpers/utils/jwtUtils';
import getConstants from '@helpers/constants/getConstants';

const constant = getConstants()

@Injectable()
export class LoginLogoutUseCase {
    constructor(
        private repository: PrismaAdminRepository
    ) { }

    async login(@Body() body: AdminLoginProps, @Res() res: any) {
        const { email, senha } = body;
        if (!email || !senha) {
            throw new AppError(constant.AUTH.INVALIDO, HttpStatus.BAD_REQUEST.toString());
        }

        const admin = await this.repository.findByEmail(email);
        
        if (!admin) {
            throw new AppError(constant.AUTH.INVALIDO, HttpStatus.UNAUTHORIZED.toString());
        }

        const isPasswordCorrect = await AdminProps.comparePassword(senha, admin.senha);
        
        if (!isPasswordCorrect) {
            throw new AppError(constant.AUTH.INVALIDO, HttpStatus.UNAUTHORIZED.toString());
        }

        const token = JwtUtils.createJwt({ _id: admin.id, name: admin.nome, role: 'Administrador' }, 'Administrador');
        JwtUtils.setResponseCookie(token, res);

        return res.status(HttpStatus.OK).json({ admin: { _id: admin.id, name: admin.nome, role: 'admin' }, msg: 'Logged in successfully' });
    }

    async logout(@Res() res: any) {
        res.clearCookie('token');
        return res.status(HttpStatus.OK).json({ msg: 'User logged out!' });
    }
}
