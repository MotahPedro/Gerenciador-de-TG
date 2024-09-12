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
            NOT_FOUND: 'aluno não encontrado',
        },

    }
}