import { ApiProperty } from '@nestjs/swagger';

export class AlunosResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: '12345' })
    matricula: string;

    @ApiProperty({ example: 'John Doe' })
    nome: string;

    @ApiProperty({ example: 'john.doe@example.com' })
    email: string;

    @ApiProperty({ example: 'password123' })
    senha: string;

    @ApiProperty({ example: 'Computer Science' })
    curso: string;

    @ApiProperty({ example: 'Class A' })
    turma: string;

    @ApiProperty({ example: 'Spring 2022' })
    periodo: string;

    @ApiProperty({ example: '2nd semester' })
    semestre: string;

    @ApiProperty({ example: false })
    filaDependencia: boolean;

    @ApiProperty({ type: Object, example: { nome: 'John Smith' } })
    professorOrientador: { nome: string };

    @ApiProperty({ example: 1 })
    professorOrientadorId: number;

    @ApiProperty({
        type: [Object],
        example: [
            {
                tema: 'Topic 1',
                objetivo: 'Objective 1',
                questaoProblema: 'Problem 1',
            },
            {
                tema: 'Topic 2',
                objetivo: 'Objective 2',
                questaoProblema: 'Problem 2',
            },
        ],
    })
    trabalhos: {
        tema: string;
        objetivo: string;
        questaoProblema: string;
    }[];
}