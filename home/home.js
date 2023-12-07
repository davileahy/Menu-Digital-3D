// Função para exibir detalhes do restaurante e cardápio
function exibirDetalhesRestauranteECardapio(restauranteID) {
    const detalhesDiv = document.getElementById('restaurantDetails');

    // Limpa o conteúdo anterior
    detalhesDiv.innerHTML = '';

    // Recuperar o documento do restaurante
    db.collection('restaurantes').doc(restauranteID).get()
        .then((doc) => {
            if (doc.exists) {
                const restaurante = doc.data();
                if (restaurante.imagem) {
                    detalhesDiv.innerHTML += `<img id="restauranteImagem" src="${restaurante.imagem}" alt="${restaurante.nome}">`;
                }

                detalhesDiv.innerHTML += `<h2>${restaurante.nome}</h2>
                    <p>Endereço: ${restaurante.localizacao}</p>
                    <p>Aberto: ${restaurante.aberto}</p>
                    <p>Telefone: ${restaurante.telefone}</p>`;
            } else {
                console.error('Restaurante não encontrado');
            }
        })
        .catch((error) => {
            console.error('Erro ao recuperar detalhes do restaurante:', error);
        });

    // Recuperar o cardápio do restaurante
    db.collection('cardapio').where('restauranteID', '==', restauranteID).get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                const cardapio = doc.data();

                // Exibir o título "Cardápio"
                detalhesDiv.innerHTML += `<h3 id="cardapioTitle">Cardápio</h3>`;
                const cardapioContent = document.createElement('div');
                cardapioContent.id = 'cardapioContent';

                // Função para obter e exibir os alimentos
                const obterEExibirAlimentos = () => {
                    db.collection('cardapio').doc(doc.id).collection('alimentos').get()
                        .then((alimentosSnapshot) => {
                            cardapioContent.innerHTML += `<h4>Alimentos</h4>`;
                            alimentosSnapshot.docs.forEach((alimentoDoc) => {
                                const alimento = alimentoDoc.data();
                                cardapioContent.innerHTML += `<h5>${alimento.nome}</h5>`;
                                Object.keys(alimento).forEach((campo) => {
                                    if (campo !== 'nome') {
                                        cardapioContent.innerHTML += `<p>${campo}: ${alimento[campo]}</p>`;
                                    }
                                });
                            });
                        })
                        .catch((error) => {
                            console.error('Erro ao recuperar alimentos do cardápio:', error);
                        });
                };

                // Função para obter e exibir as bebidas
                const obterEExibirBebidas = () => {
                    db.collection('cardapio').doc(doc.id).collection('bebidas').get()
                        .then((bebidasSnapshot) => {
                            cardapioContent.innerHTML += `<h4>Bebidas</h4>`;
                            bebidasSnapshot.docs.forEach((bebidaDoc) => {
                                const bebida = bebidaDoc.data();
                                cardapioContent.innerHTML += `<h5>${bebida.nome}</h5>`;
                                Object.keys(bebida).forEach((campo) => {
                                    if (campo !== 'nome') {
                                        cardapioContent.innerHTML += `<p>${campo}: ${bebida[campo]}</p>`;
                                    }
                                });
                            });
                        })
                        .catch((error) => {
                            console.error('Erro ao recuperar bebidas do cardápio:', error);
                        });
                };

                // Chama as funções para obter e exibir alimentos e bebidas
                obterEExibirAlimentos();
                obterEExibirBebidas();

                detalhesDiv.appendChild(cardapioContent);

                // Adiciona um evento de clique para exibir/ocultar o cardápio
                const cardapioTitle = document.getElementById('cardapioTitle');
                cardapioTitle.addEventListener('click', () => {
                    cardapioContent.style.display = (cardapioContent.style.display === 'none' || !cardapioContent.style.display) ? 'block' : 'none';
                });
            });
        })
        .catch((error) => {
            console.error('Erro ao recuperar detalhes do cardápio:', error);
        });
}


// Função para exibir a lista de restaurantes
function exibirRestaurantes() {
    const restaurantList = document.getElementById('restaurantList');
    const restaurantesRef = db.collection('restaurantes');

    restaurantesRef.get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            const restaurante = doc.data();
            const li = document.createElement('li');
            li.textContent = restaurante.nome;

            li.addEventListener('click', () => {
                exibirDetalhesRestauranteECardapio(doc.id);
            });

            restaurantList.appendChild(li);
        });
    });
}

// Chame a função para exibir a lista de restaurantes quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    exibirRestaurantes();
});
