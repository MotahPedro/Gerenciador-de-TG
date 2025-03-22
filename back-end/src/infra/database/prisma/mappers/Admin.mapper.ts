import { AdminProps } from "@domain/entities/Admin"

export class AdminMapper{
    static toPrisma(admin: Partial<AdminProps>): any {
        return {
            cpf: admin.cpf,
            nome: admin.nome,
            email: admin.email,
            senha: admin.senha,
            cargo: admin.cargo,
        }
    }

    static toDomain(raw: Partial<AdminProps>): Partial<AdminProps> {
        return {
            cpf: raw.cpf,
            nome: raw.nome,
            email: raw.email,
            senha: raw.senha,
            cargo: raw.cargo
        }
    }

    static toGET(raw: any): any {
        return {
            cpf: raw.cpf,
            nome: raw.nome,
            email: raw.email,
            senha: raw.senha,
            cargo: raw.cargo
        }
    }
}