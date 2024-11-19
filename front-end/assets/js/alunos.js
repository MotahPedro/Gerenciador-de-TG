// Seletores
const alunoForm = document.getElementById('alunoForm');
const alunosTable = document.getElementById('alunosTable').querySelector('tbody');
const filtroInput = document.getElementById('filtro');
const buscarButton = document.getElementById('buscar');
const limparBuscaButton = document.getElementById('limparBusca');

// Seletor do popup e dos campos do formulário dentro dele
const popup = document.getElementById('popup');
const popupForm = document.getElementById('popupForm');
const cancelarButton = document.getElementById('cancelarButton');
const atualizarButton = document.getElementById('atualizarButton');

// Base URL
const baseURL = 'http://127.0.0.1:3080/gerenciadorDeTG/v1';

// Função para criar uma linha na tabela
function adicionarLinha(aluno) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${aluno.matricula}</td>
        <td>${aluno.nome}</td>
        <td>${aluno.email}</td>
        <td>${aluno.curso}</td>
        <td>
            <button onclick="exibirTrabalhos('${aluno.matricula}')">Trabalhos</button>
            <button onclick="editarAluno('${aluno.matricula}')">Editar</button>
            <button onclick="deletarAluno('${aluno.matricula}')">Deletar</button>
        </td>
    `;
    alunosTable.appendChild(row);
}

// Submeter formulário de cadastro
alunoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(alunoForm);

    const novoAluno = {
        matricula: formData.get('matricula'),
        nome: formData.get('nome'),
        email: formData.get('email'),
        senha: formData.get('senha'),
        curso: formData.get('curso'),
        turma: formData.get('turma'),
        periodo: Number(formData.get('periodo')),
        semestre: Number(formData.get('semestre')),
        filaDependencia: formData.get('filaDependencia') === 'on',
        professorOrientadorId: Number(formData.get('professorOrientadorId')),
        trabalhos: [], // Trabalhos podem ser adicionados depois
    };

    try {
        const response = await fetch(`${baseURL}/aluno`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoAluno),
        });

        if (response.ok) {
            const alunoCadastrado = await response.json();
            adicionarLinha(alunoCadastrado);
            alunoForm.reset();
        } else {
            console.error('Erro ao cadastrar aluno:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao conectar à API:', error);
    }
});

// Carregar trabalhos por matrícula
async function exibirTrabalhos(matricula) {
    try {
        const response = await fetch(`${baseURL}/trabalho/${matricula}`, { method: 'GET' });

        if (response.ok) {
            const trabalhos = await response.json();
            alert(
                trabalhos
                    .map(
                        (trabalho, index) =>
                            `Trabalho ${index + 1}:\nTema: ${trabalho.tema}\nObjetivo: ${trabalho.objetivo}\nQuestão Problema: ${trabalho.questaoProblema}`
                    )
                    .join('\n\n')
            );
        } else {
            alert('Nenhum trabalho encontrado para este aluno.');
        }
    } catch (error) {
        console.error('Erro ao buscar trabalhos:', error);
    }
}

// Atualizar aluno
function editarAluno(matricula) {
    fetch(`${baseURL}/trabalho/${matricula}`)
        .then((response) => response.json())
        .then((aluno) => {
            // Preenche os campos do popup com os dados do aluno
            document.getElementById('matriculaPopup').value = aluno.matricula;
            document.getElementById('nomePopup').value = aluno.nome;
            document.getElementById('emailPopup').value = aluno.email;
            document.getElementById('cursoPopup').value = aluno.curso;

            // Exibe o popup
            popup.style.display = 'flex';

            // Configura a ação do botão "Atualizar"
            atualizarButton.onclick = async (e) => {
                e.preventDefault();

                // Cria um objeto com os dados atualizados
                const alunoAtualizado = {
                    matricula: document.getElementById('matriculaPopup').value,
                    nome: document.getElementById('nomePopup').value,
                    email: document.getElementById('emailPopup').value,
                    curso: document.getElementById('cursoPopup').value,
                };

                // Faz a requisição para atualizar o aluno
                const response = await fetch(`${baseURL}/trabalho/update/${matricula}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(alunoAtualizado),
                });

                if (response.ok) {
                    alert('Aluno atualizado com sucesso');
                    popup.style.display = 'none';
                    buscarTodosAlunos();
                } else {
                    alert('Erro ao atualizar o aluno');
                }
            };
        });
}

// Deletar aluno
async function deletarAluno(matricula) {
    try {
        const response = await fetch(`${baseURL}/trabalho/delete/${matricula}`, { method: 'DELETE' });

        if (response.ok) {
            alert('Aluno deletado com sucesso');
            buscarTodosAlunos();
        } else {
            console.error('Erro ao deletar aluno:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao conectar à API:', error);
    }
}

// Atualizar tabela com lista de alunos
async function buscarTodosAlunos() {
    alunosTable.innerHTML = '';

    try {
        const response = await fetch(`${baseURL}/aluno`, { method: 'GET' });
        if (response.ok) {
            const alunos = await response.json();
            alunos.forEach(adicionarLinha);
        } else {
            console.error('Erro ao carregar alunos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao conectar à API:', error);
    }
}

// Buscar alunos ao clicar no botão de buscar
buscarButton.addEventListener('click', () => {
    const filtro = filtroInput.value.trim();
    if (filtro) {
        exibirTrabalhos(filtro);
    } else {
        buscarTodosAlunos();
    }
});

// Limpar busca
limparBuscaButton.addEventListener('click', () => {
    filtroInput.value = '';
    buscarTodosAlunos();
});

// Fechar o popup sem alterações
cancelarButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Carregar alunos ao inicializar a página
buscarTodosAlunos();
