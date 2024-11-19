// Seletores
const professorForm = document.getElementById('professorForm');
const professoresTable = document.getElementById('professoresTable').querySelector('tbody');
const filtroInput = document.getElementById('filtro');
const buscarButton = document.getElementById('buscar');
const limparBuscaButton = document.getElementById('limparBusca');

// Seletor do popup e dos campos do formulário dentro dele
const popup = document.getElementById('popup');
const popupForm = document.getElementById('popupForm');
const cancelarButton = document.getElementById('cancelarButton');
const atualizarButton = document.getElementById('atualizarButton');

// Função para criar uma linha na tabela
function adicionarLinha(professor) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${professor.cpf}</td>
        <td>${professor.nome}</td>
        <td>${professor.email}</td>
        <td>
            <button onclick="editarProfessor('${professor.cpf}')">Editar</button>
            <button onclick="deletarProfessor('${professor.cpf}')">Deletar</button>
        </td>
    `;
    professoresTable.appendChild(row);
}

// Submeter formulário de cadastro
professorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(professorForm);

    const novoProfessor = {
        cpf: formData.get('cpf'),
        nome: formData.get('nome'),
        email: formData.get('email'),
        senha: formData.get('senha'),
        linhasOrientacao: formData.get('linhasOrientacao').split(',').filter((item) => item.trim() !== ''),
        quantidadeInstituicoes: Number(formData.get('quantidadeInstituicoes')) || 0,
        cursosAtuacao: formData.get('cursosAtuacao').split(',').filter((item) => item.trim() !== ''),
        quantidadeAlunos: Number(formData.get('quantidadeAlunos')) || 0,
        alunosOrientados: formData.get('alunosOrientados').split(',').filter((item) => item.trim() !== ''),
    };

    try {
        const response = await fetch('http://localhost:3080/gerenciadorDeTG/v1/orientador', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoProfessor),
        });

        if (response.ok) {
            const professorCadastrado = await response.json();
            adicionarLinha(professorCadastrado);
            professorForm.reset();
        } else {
            console.error('Erro ao cadastrar professor:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao conectar à API:', error);
    }
});

// Carregar professor por CPF
async function buscarProfessorPorCPF(cpf) {
    try {
        const response = await fetch(`http://localhost:3080/gerenciadorDeTG/v1/orientador/${cpf}`, {
            method: 'GET',
        });

        if (response.ok) {
            const professor = await response.json();
            atualizarTabela([professor]);
        } else if (response.status === 404) {
            atualizarTabela([]); // Nenhum professor encontrado
        } else {
            console.error('Erro ao buscar professor:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao conectar à API:', error);
    }
}

// Atualiza tabela com lista de professores
function atualizarTabela(professores) {
    professoresTable.innerHTML = '';
    professores.forEach(adicionarLinha);
}

// Buscar professores quando o botão de buscar for clicado
buscarButton.addEventListener('click', () => {
    const filtro = filtroInput.value.trim();
    if (filtro) {
        buscarProfessorPorCPF(filtro);
    } else {
        console.log("Filtro vazio");
    }
});

// Limpar a busca
limparBuscaButton.addEventListener('click', () => {
    filtroInput.value = '';
    buscarProfessorPorCPF('');  // Faz a busca sem filtro
});

// Abrir popup para editar
function editarProfessor(cpf) {
    fetch(`http://localhost:3080/gerenciadorDeTG/v1/orientador/${cpf}`)
        .then(response => response.json())
        .then(professor => {
            // Preenche os campos do popup com os dados do professor
            document.getElementById('cpfPopup').value = professor.cpf;
            document.getElementById('nomePopup').value = professor.nome;
            document.getElementById('emailPopup').value = professor.email;
            document.getElementById('senhaPopup').value = professor.senha;
            document.getElementById('linhasOrientacaoPopup').value = professor.linhasOrientacao.join(',');
            document.getElementById('quantidadeInstituicoesPopup').value = professor.quantidadeInstituicoes;
            document.getElementById('cursosAtuacaoPopup').value = professor.cursosAtuacao.join(',');
            document.getElementById('quantidadeAlunosPopup').value = professor.quantidadeAlunos;
            document.getElementById('alunosOrientadosPopup').value = professor.alunosOrientados.join(',');

            // Exibe o popup
            popup.style.display = 'flex';

            // Configura a ação do botão "Atualizar"
            atualizarButton.onclick = async (e) => {
                e.preventDefault();

                // Cria um objeto com os dados atualizados
                const updatedProfessor = {
                    cpf: document.getElementById('cpfPopup').value,
                    nome: document.getElementById('nomePopup').value,
                    email: document.getElementById('emailPopup').value,
                    senha: document.getElementById('senhaPopup').value,
                    linhasOrientacao: document.getElementById('linhasOrientacaoPopup').value.split(',').filter((item) => item.trim() !== ''),
                    quantidadeInstituicoes: Number(document.getElementById('quantidadeInstituicoesPopup').value),
                    cursosAtuacao: document.getElementById('cursosAtuacaoPopup').value.split(',').filter((item) => item.trim() !== ''),
                    quantidadeAlunos: Number(document.getElementById('quantidadeAlunosPopup').value),
                    alunosOrientados: document.getElementById('alunosOrientadosPopup').value.split(',').filter((item) => item.trim() !== '')
                };

                // Faz a requisição para atualizar o professor
                const response = await fetch(`http://localhost:3080/gerenciadorDeTG/v1/orientador/update/${cpf}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedProfessor),
                });

                if (response.ok) {
                    alert('Professor atualizado com sucesso');
                    popup.style.display = 'none';
                    buscarProfessorPorCPF('');  // Atualiza a tabela após a edição
                } else {
                    alert('Erro ao atualizar o professor');
                }
            };
        });
}

// Fechar o popup sem fazer alterações
cancelarButton.addEventListener('click', () => {
    popup.style.display = 'none';
});
