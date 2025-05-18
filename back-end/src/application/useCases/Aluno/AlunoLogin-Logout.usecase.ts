import { Injectable, HttpStatus, Body, Res } from '@nestjs/common';
import AppError from '@helpers/errors/AppError';
import { JwtUtils } from '@helpers/utils/jwtUtils';
import getConstants from '@helpers/constants/getConstants';
import { PrismaAlunoRepository } from '@infra/database/prisma/repositories/AlunoRepository';
import { AlunoOrientadoProps } from '@domain/entities/AlunoOrientado';

const constant = getConstants()

@Injectable()
export class AlunoLoginLogoutUseCase {
    constructor(
        private repository: PrismaAlunoRepository
    ) { }

    async login(@Body() body: AlunoOrientadoProps, @Res() res: any) {
        const { email, senha } = body;
        if (!email || !senha) {
            throw new AppError(constant.AUTH.INVALIDO, HttpStatus.BAD_REQUEST.toString());
        }

        const aluno = await this.repository.findByEmail(email);
        
        if (!aluno) {
            throw new AppError(constant.AUTH.INVALIDO, HttpStatus.UNAUTHORIZED.toString());
        }

        const isPasswordCorrect = await AlunoOrientadoProps.comparePassword(senha, aluno.senha);
        
        if (!isPasswordCorrect) {
            throw new AppError(constant.AUTH.INVALIDO, HttpStatus.UNAUTHORIZED.toString());
        }

        const token = JwtUtils.createJwt({ _id: aluno.id, name: aluno.nome, role: 'Aluno' }, 'Aluno');
        JwtUtils.setResponseCookie(token, res);

        return res.status(HttpStatus.OK).json({ aluno: { _id: aluno.id, name: aluno.nome, role: 'Aluno' }, msg: 'Logged in successfully' });
    }

    async logout(@Res() res: any) {
        res.clearCookie('token');
        return res.status(HttpStatus.OK).json({ msg: 'User logged out!' });
    }
}
