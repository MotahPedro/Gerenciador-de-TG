import { JwtEntity } from '@helpers/utils/JwtUtils'

declare global {
	namespace Express {
		interface Request {
			user?: JwtEntity
		}
	}
}