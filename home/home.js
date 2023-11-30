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
        // Se o valor do objeto for um objeto, formate recursivamente
        if (typeof value === 'object') {
            return `${key}: { ${formatarObjeto(value)} }`;
        }
        return `${key}: ${value}`;
    }).join(', ');
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
        db.collection('restaurantes').doc(documentoId).get()
            .then((doc) => {
                if (doc.exists) {
                    const dados = doc.data();

                    // Exibe os campos do documento
                    Object.keys(dados).forEach((campo) => {
                        const paragrafo = document.createElement('p');
                        const valorFormatado = formatarCampo(campo, dados[campo]);
                        paragrafo.textContent = `${campo}: ${valorFormatado}`;
                        detalhesDiv.appendChild(paragrafo);
                    });

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

// Restante do seu código permanece inalterado...

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
