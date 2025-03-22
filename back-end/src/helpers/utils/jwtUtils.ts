import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AppError from '@helpers/errors/AppError';
import { HttpStatus } from '@nestjs/common';

export type JwtRoles = 'instructor' | 'student' | 'admin';

export interface JwtEntity {
  _id: string;
  name: string;
  role?: JwtRoles;
}

export class JwtUtils {
  static createJwt(entity: JwtEntity, role: JwtRoles): string {
    if (!process.env.JWT_SECRET) {
      throw new AppError('JWT_SECRET is not defined', HttpStatus.INTERNAL_SERVER_ERROR.toString());
    }

    return jwt.sign(
      {
        sub: entity._id,
        name: entity.name,
        role
      },
      process.env.JWT_SECRET,
      { expiresIn: Number(process.env.JWT_LIFETIME) }
    );
  }

  static setResponseCookie(token: string, res: Response): void {
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + Number(process.env.JWT_LIFETIME) * 1000),
      signed: true
    });
  }

  static verifyJwt(req: Request, res: Response, next: NextFunction): void | Response {
    const token = req.signedCookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError('Unauthorized', HttpStatus.UNAUTHORIZED.toString());
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtEntity;
      req.user = decoded; // Adiciona o usuário ao request
      next();
    } catch (error) {
      throw new AppError('Unauthorized', HttpStatus.UNAUTHORIZED.toString());
    }
  }

  static requireRole(requiredRole: JwtRoles) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user || req.user.role !== requiredRole) {
        throw new AppError('Forbidden', HttpStatus.FORBIDDEN.toString());
      }
      next();
    }
  }
}
