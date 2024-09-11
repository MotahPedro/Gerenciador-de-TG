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
        }    
    }
}