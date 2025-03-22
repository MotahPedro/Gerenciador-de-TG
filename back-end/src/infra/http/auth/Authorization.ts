import { Request, NextFunction } from 'express'
import AppError from '@helpers/errors/AppError'
import { HttpStatus } from '@nestjs/common'

export const authorizePermissions = (requiredRoles: string[]) => {
	return (req: Request, next: NextFunction) => {

		const userRole = req.body.cargo

		if (!requiredRoles.includes(userRole)) {
			throw new AppError('Unauthorized to access this route', HttpStatus.UNAUTHORIZED.toString())
		}

		next()
	}
}