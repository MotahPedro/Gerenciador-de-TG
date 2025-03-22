export default function getConstants() {
    return {
        ADMIN: {
            VALIDADE: 'CPF, Nome, Email, Senha, Cargo e Chave são obrigatórios',
            INTERNAL: 'Erro ao criar admin: ',
            CPF: 'CPF já cadastrado',
            EMAIL: 'Email já cadastrado',
            KEY_ERROR: 'Chave inválida',
            GET_CPF: {
                ERRO: 'Erro ao buscar admin',
                VAZIO: 'CPF não pode ser vazio',
            },
            GET_EMAIL: {
                ERRO: 'Erro ao buscar admin',
                VAZIO: 'Email não pode ser vazio',
            },
            GET_ALL: {
                ERRO: 'Erro ao buscar admins',
                NÃO_HA: 'Nenhum admin cadastrado',
            },
            UPDATE: {
                ERRO: 'Erro ao atualizar admin',
                VAZIO: 'CPF não pode ser vazio',
            },
            NOT_FOUND: 'Admin não encontrado',
        },
        ORIENTADOR: {
            VALIDADE: 'CPF, Nome, Email, Senha, linhasOrientacao e cursosAtuacaoo são obrigatórios',
            INTERNAL: 'Erro ao criar orientador: ',
            CPF: 'CPF já cadastrado',
            EMAIL: 'Email já cadastrado',
            GET_CPF: {
                ERRO: 'Erro ao buscar orientador',
                VAZIO: 'CPF não pode ser vazio',
            },
            GET_EMAIL: {
                ERRO: 'Erro ao buscar orientador',
                VAZIO: 'Email não pode ser vazio',
            },
            GET_ALL: {
                ERRO: 'Erro ao buscar orientadores',
                NÃO_HA: 'Nenhum orientador cadastrado',
            },
            UPDATE: {
                ERRO: 'Erro ao atualizar orientador',
                VAZIO: 'Os dados não podem ser vazios',
            },
            NOT_FOUND: 'Orientador não encontrado',
        },
        ALUNO: {
            VALIDADE: 'CPF, Nome, Email, Senha, curso e turma são obrigatórios',
            INTERNAL: 'Erro ao criar aluno: ',
            RA: 'RA já cadastrado',
            EMAIL: 'Email já cadastrado',
            GET_RA: {
                ERRO: 'Erro ao buscar aluno',
                VAZIO: 'RA não pode ser vazio',
            },
            GET_EMAIL: {
                ERRO: 'Erro ao buscar aluno',
                VAZIO: 'Email não pode ser vazio',
            },
            GET_ALL: {
                ERRO: 'Erro ao buscar alunos',
                NÃO_HA: 'Nenhum aluno cadastrado',
            },
            UPDATE: {
                ERRO: 'Erro ao atualizar aluno',
                VAZIO: 'RA não pode ser vazio',
            },
            NOT_FOUND: 'Aluno não encontrado',
        },
        TRABALHO: {
            CREATE_ERROR: 'Tema, Objetivo e Questão Problema são obrigatórios',
            INVALID_RA: 'RA do aluno não cadastrado',
            INTERNAL: 'Erro ao registrar trabalho: ',
            RA: 'RA já cadastrado',
            EMAIL: 'Email já cadastrado',
            GET_ID: {
                ERRO: 'Erro ao buscar trabalho',
                VAZIO: 'ID não pode ser vazio',
            },
            GET_ALUNORA: {
                ERRO: 'Erro ao buscar trabalho pelo ra aluno',
                VAZIO: 'RA não pode ser vazio',
            },
            GET_ALL: {
                ERRO: 'Erro ao buscar trabalhos',
                NÃO_HA: 'Nenhum trabalho cadastrado',
            },
            UPDATE: {
                ERRO: 'Erro ao atualizar trabalho',
                VAZIO: 'ID não pode ser vazio',
            },
            NOT_FOUND: 'Trabalho não encontrado',
        },
        LINHA: {
            CREATE_ERROR: 'Nome e Descrição são obrigatórios',
            INTERNAL: 'Erro ao criar linha de orientação: ',
            GET_ID: {
                ERRO: 'Erro ao buscar linha de orientação por ID',
                VAZIO: 'ID não pode ser vazio',
            },
            GET_CPF: {
                ERRO: 'Erro ao buscar linha de orientação por CPF',
                VAZIO: 'CPF não pode ser vazio',
            },
            INVALID_CPF: 'CPF do professor orientador não cadastrado',
            GET_ALL: {
                ERRO: 'Erro ao buscar linhas de orientação',
                NÃO_HA: 'Nenhuma linha de orientação cadastrada',
            },
            UPDATE: {
                ERRO: 'Erro ao atualizar linha de orientação',
                VAZIO: 'Os dados não podem ser vazios',
            },
            NOT_FOUND: 'Linha de orientação não encontrada',
        },
        CURSO: {
            CREATE_ERROR: 'Nome e Descrição são obrigatórios',
            INTERNAL: 'Erro ao criar curso de atuação: ',
            GET_ID: {
                ERRO: 'Erro ao buscar curso de atuação por ID',
                VAZIO: 'ID não pode ser vazio',
            },
            GET_CPF: {
                ERRO: 'Erro ao buscar curso de atuação por CPF',
                VAZIO: 'CPF não pode ser vazio',
            },
            INVALID_CPF: 'CPF do professor orientador não cadastrado',
            GET_ALL: {
                ERRO: 'Erro ao buscar cursos de atuação',
                NÃO_HA: 'Nenhum curso de atuação cadastrado',
            },
            UPDATE: {
                ERRO: 'Erro ao atualizar curso de atuação',
                VAZIO: 'Os dados não podem ser vazios',
            },
            NOT_FOUND: 'Curso de atuação não encontrado',
        },
        AUTH: {
            INVALIDO: 'Credenciais inválidas',
            NÃO_AUTORIZADO: 'Não autorizado',
            PROIBIDO: 'Acesso negado',
        },
    }
}