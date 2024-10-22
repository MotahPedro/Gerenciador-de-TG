export const mockOrientadorCompleto = {
    cpf: '12345678900',
    nome: 'John Doe',
    email: 'john.doe@example.com',
    senha: 'password123',
    linhasOrientacao: [{ linha: 'Linha 1' }],
    cursosAtuacao: [{ curso: 'Curso 1' }],
    quantidadeInstituicoes: 1,
    quantidadeAlunos: 10,
    alunosOrientados: [
      {
        matricula: '123456',
        nome: 'Maria Souza',
        email: 'maria.souza@example.com',
        senha: 'senhaSegura123',
        curso: 'Engenharia de Software',
        turma: '202411',
        periodo: '1',
        semestre: '1',
        filaDependencia: 'false',
        trabalhos: [
          {
            tema: 'Desenvolvimento de Software',
            objetivo: 'Criar um sistema de gestão',
            questaoProblema: 'Como melhorar a eficiência do desenvolvimento de software?'
          }
        ]
      }
    ]
  };
  
export const mockOrientadorIncompleto = {
    cpf: '',
    nome: '',
    email: '',
    senha: '',
    linhasOrientacao: [],
    cursosAtuacao: [],
    quantidadeInstituicoes: 0,
    quantidadeAlunos: 0,
    alunosOrientados: []
};