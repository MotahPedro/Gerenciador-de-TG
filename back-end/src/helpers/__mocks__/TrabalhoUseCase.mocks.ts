import { TrabalhoProps } from "@domain/entities/Trabalhos";

export const trabalhoMockCompleto: TrabalhoProps = {
    tema: 'Desenvolvimento de Software',
    objetivo: 'Criar um sistema de gestão',
    questaoProblema: 'Como melhorar a eficiência do desenvolvimento de software?',
};

export const trabalhoMockVazio: TrabalhoProps = {
    tema: '',
    objetivo: '',
    questaoProblema: '',
};