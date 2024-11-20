// Seletores
const alunoForm = document.getElementById('alunoForm');
const alunosTable = document.getElementById('alunosTable').querySelector('tbody');
const filtroInput = document.getElementById('filtro');
const buscarButton = document.getElementById('buscar');
const limparBuscaButton = document.getElementById('limparBusca');
const popup = document.getElementById('popup');
const popupForm = document.getElementById('popupForm');
const cancelarButton = document.getElementById('cancelarButton');
const atualizarButton = document.getElementById('atualizarButton');

// Função para criar uma linha na tabela
function adicionarLinha(aluno) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${aluno.matricula}</td>
        <td>${aluno.nome}</td>
        <td>${aluno.email}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.turma || ''}</td>
        <td>${aluno.periodo || ''}</td>
        <td>${aluno.semestre || ''}</td>
        <td>${aluno.filaDependencia ? 'Sim' : 'Não'}</td>
        <td>${aluno.professorOrientadorId || ''}</td>
        <td>
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
        periodo: formData.get('periodo'),
        semestre: formData.get('semestre'),
        filaDependencia: formData.get('filaDependencia') === 'on',
        professorOrientadorId: parseInt(formData.get('professorOrientadorId')) || 0,
        trabalhos: [],
    };

    try {
        const response = await fetch('http://127.0.0.1:3080/gerenciadorDeTG/v1/aluno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoAluno),
        });

        if (response.ok) {
            const alunoCadastrado = await response.json();
            adicionarLinha(alunoCadastrado);
            alunoForm.reset();
        } else {
            console.error('Erro ao cadastrar aluno');
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
    }
});

// Buscar aluno por matrícula
async function buscarAlunoPorMatricula(matricula) {
    try {
        const response = await fetch(`http://127.0.0.1:3080/gerenciadorDeTG/v1/aluno/${matricula}`, {
            method: 'GET',
        });

        if (response.ok) {
            const aluno = await response.json();
            atualizarTabela([aluno]);
        } else if (response.status === 404) {
            atualizarTabela([]);
        } else {
            console.error('Erro ao buscar aluno:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao conectar à API:', error);
    }
}

// Atualiza tabela com lista de alunos
function atualizarTabela(alunos) {
    alunosTable.innerHTML = '';
    alunos.forEach(adicionarLinha);
}

// Buscar alunos ao clicar no botão de buscar
buscarButton.addEventListener('click', () => {
    const filtro = filtroInput.value.trim();
    if (filtro) {
        buscarAlunoPorMatricula(filtro);
    } else {
        console.log('Filtro vazio');
    }
});

// Limpar a busca
limparBuscaButton.addEventListener('click', () => {
    filtroInput.value = '';
    buscarAlunoPorMatricula(''); // Atualiza tabela sem filtro
});

// Abrir popup para editar
function editarAluno(matricula) {
    fetch(`http://127.0.0.1:3080/gerenciadorDeTG/v1/aluno/${matricula}`)
        .then(response => response.json())
        .then(aluno => {
            document.getElementById('matriculaPopup').value = aluno.matricula;
            document.getElementById('nomePopup').value = aluno.nome;
            document.getElementById('emailPopup').value = aluno.email;
            document.getElementById('senhaPopup').value = aluno.senha;
            document.getElementById('cursoPopup').value = aluno.curso;
            document.getElementById('turmaPopup').value = aluno.turma || '';
            document.getElementById('periodoPopup').value = aluno.periodo || '';
            document.getElementById('semestrePopup').value = aluno.semestre || '';
            document.getElementById('filaDependenciaPopup').checked = aluno.filaDependencia;

            popup.style.display = 'flex';

            atualizarButton.onclick = async (e) => {
                e.preventDefault();
                const updatedAluno = {
                    nome: document.getElementById('nomePopup').value || aluno.nome,
                    email: document.getElementById('emailPopup').value || aluno.email,
                    senha: document.getElementById('senhaPopup').value || aluno.senha,
                    curso: document.getElementById('cursoPopup').value || aluno.curso,
                    turma: document.getElementById('turmaPopup').value || aluno.turma,
                    periodo: document.getElementById('periodoPopup').value || aluno.periodo,
                    semestre: document.getElementById('semestrePopup').value || aluno.semestre,
                    filaDependencia: document.getElementById('filaDependenciaPopup').checked
                };

                const response = await fetch(`http://127.0.0.1:3080/gerenciadorDeTG/v1/aluno/update/${matricula}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedAluno),
                });

                if (response.ok) {
                    alert('Aluno atualizado com sucesso');
                    popup.style.display = 'none';
                    buscarAlunoPorMatricula('');
                } else {
                    alert('Erro ao atualizar o aluno');
                }
            };
        });
}

// Deletar aluno
async function deletarAluno(matricula) {
    try {
        const response = await fetch(`http://127.0.0.1:3080/gerenciadorDeTG/v1/aluno/delete/${matricula}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Aluno deletado com sucesso');
            buscarAlunoPorMatricula('');
        } else {
            alert('Erro ao deletar o aluno');
        }
    } catch (error) {
        console.error('Erro ao conectar à API:', error);
    }
}

// Fechar o popup sem salvar alterações
cancelarButton.addEventListener('click', () => {
    popup.style.display = 'none';
});
