import { Injectable, HttpStatus, Body, Res } from '@nestjs/common';
import AppError from '@helpers/errors/AppError';
import { JwtUtils } from '@helpers/utils/jwtUtils';
import getConstants from '@helpers/constants/getConstants';

import { PrismaOrientadorRepository } from '@infra/database/prisma/repositories/OrientadorRepository';
import { ProfessorOrientadorProps } from '@domain/entities/ProfessorOrientador';

const constant = getConstants()

@Injectable()
export class OrientadorLoginLogoutUseCase {
    constructor(
        private repository: PrismaOrientadorRepository
    ) { }

    async login(@Body() body: ProfessorOrientadorProps, @Res() res: any) {
        const { email, senha } = body;
        if (!email || !senha) {
            throw new AppError(constant.AUTH.INVALIDO, HttpStatus.BAD_REQUEST.toString());
        }

        const orientador = await this.repository.findByEmail(email);
        
        if (!orientador) {
            throw new AppError(constant.AUTH.INVALIDO, HttpStatus.UNAUTHORIZED.toString());
        }

        const isPasswordCorrect = await ProfessorOrientadorProps.comparePassword(senha, orientador.senha);
        
        if (!isPasswordCorrect) {
            throw new AppError(constant.AUTH.INVALIDO, HttpStatus.UNAUTHORIZED.toString());
        }

        const token = JwtUtils.createJwt({ _id: orientador.id, name: orientador.nome, role: 'Orientador' }, 'Orientador');
        JwtUtils.setResponseCookie(token, res);

        return res.status(HttpStatus.OK).json({ orientador: { _id: orientador.id, name: orientador.nome, role: 'Orientador' }, msg: 'Logged in successfully' });
    }

    async logout(@Res() res: any) {
        res.clearCookie('token');
        return res.status(HttpStatus.OK).json({ msg: 'User logged out!' });
    }
}
