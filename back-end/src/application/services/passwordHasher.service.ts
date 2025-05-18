import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordHasherService {
	/**
	 * Hashes a password using bcrypt.
	 * @param password - The password to hash.
	 * @returns A promise that resolves to the hashed password.
	 */


	public async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		return bcrypt.hash(password, salt);
	}
}