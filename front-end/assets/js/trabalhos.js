// Seletores
const trabalhoForm = document.getElementById('trabalhoForm');
const trabalhosTable = document.getElementById('trabalhosTable').querySelector('tbody');
const filtroInput = document.getElementById('filtro');
const buscarButton = document.getElementById('buscar');
const limparBuscaButton = document.getElementById('limparBusca');

// Seletor do popup e dos campos do formulário dentro dele
const popup = document.getElementById('popup');
const popupForm = document.getElementById('popupForm');
const cancelarButton = document.getElementById('cancelarButton');
const atualizarButton = document.getElementById('atualizarButton');

// Função para criar uma linha na tabela
function adicionarLinha(trabalho) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${trabalho.id}</td>
        <td>${trabalho.tema}</td>
        <td>${trabalho.objetivo}</td>
        <td>${trabalho.questaoProblema}</td>
        <td>${trabalho.alunoOrientadoId}</td>
        <td>
            <button onclick="editarTrabalho('${trabalho.id}')">Editar</button>
            <button onclick="deletarTrabalho('${trabalho.id}')">Deletar</button>
        </td>
    `;
    trabalhosTable.appendChild(row);
}

// Submeter formulário de cadastro
trabalhoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(trabalhoForm);

    const novoTrabalho = {
        tema: formData.get('tema'),
        objetivo: formData.get('objetivo'),
        questaoProblema: formData.get('questaoProblema'),
        alunoOrientadoId: Number(formData.get('alunoOrientadoId')),
    };

    try {
        const response = await fetch('http://localhost:3080/gerenciadorDeTG/v1/trabalho', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoTrabalho),
        });

        if (response.ok) {
            const trabalhoCadastrado = await response.json();
            adicionarLinha(trabalhoCadastrado);
            trabalhoForm.reset();
        } else {
            console.error('Erro ao cadastrar trabalho:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao conectar à API:', error);
    }
});

// Carregar trabalho por ID
async function buscarTrabalhoPorID(id) {
    try {
        const response = await fetch(`http://localhost:3080/gerenciadorDeTG/v1/trabalho/${id}`, {
            method: 'GET',
        });

        if (response.ok) {
            const trabalho = await response.json();
            atualizarTabela([trabalho]);
        } else if (response.status === 404) {
            atualizarTabela([]); // Nenhum trabalho encontrado
        } else {
            console.error('Erro ao buscar trabalho:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao conectar à API:', error);
    }
}

// Atualiza tabela com lista de trabalhos
function atualizarTabela(trabalhos) {
    trabalhosTable.innerHTML = '';
    trabalhos.forEach(adicionarLinha);
}

// Buscar trabalhos quando o botão de buscar for clicado
buscarButton.addEventListener('click', () => {
    const filtro = filtroInput.value.trim();
    if (filtro) {
        buscarTrabalhoPorID(filtro);
    } else {
        console.log("Filtro vazio");
    }
});

// Limpar a busca
limparBuscaButton.addEventListener('click', () => {
    filtroInput.value = '';
    buscarTrabalhoPorID('');  // Faz a busca sem filtro
});

// Abrir popup para editar
function editarTrabalho(id) {
    fetch(`http://localhost:3080/gerenciadorDeTG/v1/trabalho/${id}`)
        .then(response => response.json())
        .then(trabalho => {
            // Preenche os campos do popup com os dados do trabalho
            document.getElementById('idPopup').value = trabalho.id;
            document.getElementById('temaPopup').value = trabalho.tema;
            document.getElementById('objetivoPopup').value = trabalho.objetivo;
            document.getElementById('questaoProblemaPopup').value = trabalho.questaoProblema;
            document.getElementById('alunoOrientadoIdPopup').value = trabalho.alunoOrientadoId;

            // Exibe o popup
            popup.style.display = 'flex';

            // Configura a ação do botão "Atualizar"
            atualizarButton.onclick = async (e) => {
                e.preventDefault();

                // Cria um objeto com os dados atualizados
                const updatedTrabalho = {
                    tema: document.getElementById('temaPopup').value || trabalho.tema,
                    objetivo: document.getElementById('objetivoPopup').value || trabalho.objetivo,
                    questaoProblema: document.getElementById('questaoProblemaPopup').value || trabalho.questaoProblema,
                    alunoOrientadoId: Number(document.getElementById('alunoOrientadoIdPopup').value) || trabalho.alunoOrientadoId,
                };

                // Faz a requisição para atualizar o trabalho
                const response = await fetch(`http://localhost:3080/gerenciadorDeTG/v1/trabalho/update/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedTrabalho),
                });

                if (response.ok) {
                    alert('Trabalho atualizado com sucesso');
                    popup.style.display = 'none';
                    buscarTrabalhoPorID('');  // Atualiza a tabela após a edição
                } else {
                    alert('Erro ao atualizar o trabalho');
                }
            };
        });
}

// Função para deletar trabalho
async function deletarTrabalho(id) {
    try {
        const response = await fetch(`http://localhost:3080/gerenciadorDeTG/v1/trabalho/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Trabalho deletado com sucesso');
            buscarTrabalhoPorID('');  // Atualiza a tabela após a exclusão
        } else {
            alert('Erro ao deletar o trabalho');
        }
    } catch (error) {
        console.error('Erro ao conectar à API:', error);
    }
}

// Fechar o popup sem fazer alterações
cancelarButton.addEventListener('click', () => {
    popup.style.display = 'none';
});
