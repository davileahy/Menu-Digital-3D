const db = firebase.firestore()

addInScreen()

function addInScreen() {
    db.collection("Restaurantes").get().then(snapshot => {
        const restaurantes = snapshot.docs.map(doc => doc.data())
  
        add(restaurantes)
    }).catch(error => {
        console.error(error)
      })
}
    
function add(restaurantes) {
    
    restaurantes.forEach((restaurante) => {
        const lista = document.getElementById('restaurantes')

        const li = document.createElement('li') 
        li.classList.add('listaRestaurantes')
    
        const nome = document.createElement('p')
    
        const localizacao = document.createElement('p')
    
        const horario = document.createElement('p')
    
        nome.innerHTML = restaurante.nome
        localizacao.innerHTML = restaurante.localização
        horario.innerHTML = restaurante.horário

        li.appendChild(nome)
        li.appendChild(localizacao)
        li.appendChild(horario)
        
        lista.appendChild(li)
    })
    
  
}
