import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest<Request>()

		const token = req.signedCookies?.token || req.headers.authorization?.split(' ')[1]
		if (!token) throw new UnauthorizedException('Unauthorized')

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			req['user'] = decoded 
			return true
		} catch (error) {
			throw new UnauthorizedException('Invalid token')
		}
	}
}
