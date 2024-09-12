export const createAlunoResponseExample = {
    id: 1,
    matricula: '12345',
    nome: 'John Doe',
    email: 'john.doe@example.com',
    senha: 'password123',
    curso: 'Computer Science',
    turma: 'Class A',
    periodo: 'Spring 2022',
    semestre: '2nd semester',
    filaDependencia: false,
    professorOrientador: { nome: 'John Smith' },
    professorOrientadorId: 1,
    trabalhos: [
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
    ]
}