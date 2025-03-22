import { JwtEntity } from '@helpers/utils/jwtUtils'

declare global {
	namespace Express {
		interface Request {
			user?: JwtEntity
		}
	}
}