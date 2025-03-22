import jwt from 'jsonwebtoken'
import AppError from '@helpers/errors/AppError'
import { HttpStatus } from '@nestjs/common'
import { Request, NextFunction } from 'express'

const authenticateUser = async (req: Request, next: NextFunction) => {
	const token = req.signedCookies.token
	if (!token) {
		throw new AppError('You need to be logged in to access this route!', HttpStatus.UNAUTHORIZED.toString())
	}

	const payload = jwt.verify(token, process.env.JWT_SECRET) as { id: string, nome: string, cargo: string }
	req.body = { id: payload.id, nome: payload.nome, cargo: payload.cargo }

	next()
}

export default authenticateUser