// Referência para o Firestore
const db = firebase.firestore();

// Função para exibir documentos na lista
function exibirDocumentos(documentos) {
    const lista = document.getElementById('documentList');

    documentos.forEach((doc) => {
        const li = document.createElement('li');

        // Alteração aqui: Exibir o nome do restaurante em vez do ID
        const nomeRestaurante = doc.data().nome; // Substitua "nome" pelo campo correto
        li.textContent = `${nomeRestaurante}`;

        li.addEventListener('click', () => toggleDetalhes(doc.id));
        lista.appendChild(li);
    });
}

// Função para tratar objetos em campos
function formatarCampo(campo, valor) {
    // Se o valor for um objeto, exibe os campos individualmente
    if (typeof valor === 'object') {
        return formatarObjeto(valor);
    }
    // Se não for um objeto, retorna o valor original
    return valor;
}

// Função para lidar com objetos aninhados
function formatarObjeto(obj) {
    return Object.entries(obj).map(([key, value]) => {
        // Se a chave for 'cardapio', exiba de maneira diferente
        if (key === 'cardapio') {
            return `${key}: ${formatarCardapio(value)}`;
        }

        // Se o valor do objeto for um objeto, formate recursivamente
        if (typeof value === 'object') {
            return `${key}: { ${formatarObjeto(value)} }`;
        }

        return `${key}: ${value}`;
    }).join(', ');
}

// Função para formatar o campo 'cardapio'
function formatarCardapio(cardapio) {
    return Object.entries(cardapio).map(([categoria, itens]) => {
        const itensFormatados = Object.entries(itens).map(([item, detalhes]) => {
            const detalhesFormatados = Object.entries(detalhes).map(([chave, valor]) => {
                return `${chave}: ${valor == true ? 'Sim' : (valor == false ? 'Não' : valor)}`;
            }).join(', ');

            return `${item}: { ${detalhesFormatados} }`;
        }).join('\n');

        return `${categoria}: { ${itensFormatados} }`;
    }).join('\n');
}

// Função para exibir detalhes progressivamente
function exibirDetalhesProgressivamente(container, dados) {
    Object.entries(dados).forEach(([campo, valor]) => {
        const paragrafo = document.createElement('p');
        container.appendChild(paragrafo);

        // Se o valor for um objeto, cria um submenu
        if (typeof valor === 'object') {
            paragrafo.textContent = `${campo}:`;
            const submenuContainer = document.createElement('div');
            container.appendChild(submenuContainer);
            exibirDetalhesProgressivamente(submenuContainer, valor);
        } else {
            // Se não for um objeto, exibe o valor diretamente
            paragrafo.textContent = `${campo}: ${valor}`;
        }
    });
}

// Função para alternar a exibição/ocultação dos detalhes de um documento
function toggleDetalhes(documentoId) {
    const detalhesDiv = document.getElementById('documentDetails');

    // Se o mesmo documento estiver aberto, fecha-o
    if (detalhesDiv.dataset.currentDocId === documentoId) {
        detalhesDiv.innerHTML = '';
        detalhesDiv.removeAttribute('data-current-doc-id');
    } else {
        // Limpa os detalhes anteriores
        detalhesDiv.innerHTML = '';

        // Recupera o documento específico
        db.collection('restaurantes')
            .doc(documentoId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const dados = doc.data();

                    // Exibe os campos do documento progressivamente
                    exibirDetalhesProgressivamente(detalhesDiv, dados);

                    // Atualiza o ID do documento atualmente aberto
                    detalhesDiv.dataset.currentDocId = documentoId;
                } else {
                    console.error('Documento não encontrado');
                }
            })
            .catch((error) => {
                console.error('Erro ao recuperar detalhes do documento:', error);
            });
    }
}

// Recuperar documentos da coleção
db.collection('restaurantes').get()
    .then((querySnapshot) => {
        const documentos = [];
        querySnapshot.forEach((doc) => {
            documentos.push(doc);
        });
        exibirDocumentos(documentos);
    })
    .catch((error) => {
        console.error('Erro ao recuperar documentos:', error);
    });

const novoRestaurante = {
    nome: "Nome do Restaurante",
    campo1: valor1,
    campo2: valor2,
    // Adicione outros campos conforme necessário
    };
    
    db.collection('restaurantes').doc('novoDocumentoId').set(novoRestaurante)
    .then(() => {
        console.log('Novo restaurante adicionado com sucesso!');
    })
    .catch((error) => {
        console.error('Erro ao adicionar novo restaurante:', error);
    });

const restauranteId = 'ID_DO_SEU_RESTAURANTE';
const camposParaAdicionar = {
    campo3: valor3,
    campo4: valor4,
    // Adicione outros campos conforme necessário
};

db.collection('restaurantes').doc(restauranteId).update(camposParaAdicionar)
    .then(() => {
    console.log('Campos adicionados/atualizados com sucesso!');
    })
    .catch((error) => {
    console.error('Erro ao adicionar/atualizar campos:', error);
    });
