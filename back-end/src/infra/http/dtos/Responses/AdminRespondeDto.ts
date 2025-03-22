import { ApiProperty } from '@nestjs/swagger';

export class AdminsResponseDto {
    @ApiProperty({ example: 1 })
    id?: number;

    @ApiProperty({ example: '12345' })
    cpf: string;

    @ApiProperty({ example: 'John Doe' })
    nome: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    email: string;

    @ApiProperty({ example: 'password123' })
    senha: string;

    @ApiProperty({ example: 'Administrador' })
    cargo: string;
}