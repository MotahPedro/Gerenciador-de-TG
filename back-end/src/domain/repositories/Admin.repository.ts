import { AdminProps } from "@domain/entities/Admin";

export abstract class AdminRepository {
  abstract save(admin: AdminProps): Promise<any>;
  abstract findByCpf(cpf: string): Promise<void>;
  abstract findByEmail(email: string): Promise<void>;
  abstract findById(id: number): Promise<void>;
  abstract deleteByCpf(cpf: string): Promise<void>;
  abstract update(cpf: string, admin: AdminProps): Promise<void>;
  abstract findAll(): Promise<void>;
}
