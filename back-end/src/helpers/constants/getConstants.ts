export default function getConstants() {
    return {
        ORIENTADOR:{
            VALIDADE: 'CPF, Nome, Email, Senha, linhasOrientacao e cursosAtuacaoo são obrigatórios',
            INTERNAL:  'Erro ao criar orientador: ',
            CPF: 'CPF já cadastrado',
            EMAIL: 'Email já cadastrado',
            GET_CPF: {
                ERRO:'Erro ao buscar orientador',
                VAZIO: 'CPF não pode ser vazio',
            },
            GET_EMAIL: {
                ERRO:'Erro ao buscar orientador',
                VAZIO: 'Email não pode ser vazio',
            },
            GET_ALL: {
                ERRO:'Erro ao buscar orientadores',
                NÃO_HA: 'Nenhum orientador cadastrado',
            },
            UPDATE: {
                ERRO:'Erro ao atualizar orientador',
                VAZIO: 'Os dados não podem ser vazios',
            },
            NOT_FOUND: 'Orientador não encontrado',
        },
        ALUNO:{
            VALIDADE: 'CPF, Nome, Email, Senha, curso e turma são obrigatórios',
            INTERNAL:  'Erro ao criar aluno: ',
            RA: 'RA já cadastrado',
            EMAIL: 'Email já cadastrado',
            GET_RA: {
                ERRO:'Erro ao buscar aluno',
                VAZIO: 'RA não pode ser vazio',
            },
            GET_EMAIL: {
                ERRO:'Erro ao buscar aluno',
                VAZIO: 'Email não pode ser vazio',
            },
            GET_ALL: {
                ERRO:'Erro ao buscar alunos',
                NÃO_HA: 'Nenhum aluno cadastrado',
            },
            UPDATE: {
                ERRO:'Erro ao atualizar aluno',
                VAZIO: 'RA não pode ser vazio',
            },
            NOT_FOUND: 'Aluno não encontrado',
        },
        TRABALHO:{
            CREATE_ERROR: 'Tema, Objetivo e Questão Problema são obrigatórios',
            INTERNAL:  'Erro ao registrar trabalho: ',
            RA: 'RA já cadastrado',
            EMAIL: 'Email já cadastrado',
            GET_ID: {
                ERRO:'Erro ao buscar trabalho',
                VAZIO: 'ID não pode ser vazio',
            },
            GET_ALUNOID: {
                ERRO:'Erro ao buscar trabalho pelo ra aluno',
                VAZIO: 'RA não pode ser vazio',
            },
            GET_ALL: {
                ERRO:'Erro ao buscar trabalhos',
                NÃO_HA: 'Nenhum trabalho cadastrado',
            },
            UPDATE: {
                ERRO:'Erro ao atualizar trabalho',
                VAZIO: 'ID não pode ser vazio',
            },
            NOT_FOUND: 'Trabalho não encontrado',
        },
    }
}