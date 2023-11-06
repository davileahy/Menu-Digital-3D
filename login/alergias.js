 
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUserUid = user.uid

        console.log("id do usuário logado: ", currentUserUid)
    }else {
        console.log("Nenhum usuário autenticado.")
    }
})
const form = document.getElementById('alergias-form')

const db = firebase.firestore()


function alergiaInDB() {
    const alergias = {};
    const alergiaCheckboxes = form.querySelectorAll('input[type="checkbox"]:checked')

    
    alergiaCheckboxes.forEach(checkbox => {
        const alergiaNome = checkbox.value
        const alergiaValor = checkbox.checked
        alergias[alergiaNome] = alergiaValor
    });

    if (Object.keys(alergias).length > 0) {
        Loading
        db.collection("usuários").doc(currentUserUid).set({alergias}).then(() => {
            window.alert('Alergias salvas com sucesso!')
            window.location.href = "../home/home.html"
        }).catch(error => {
            console.log(error)
        })
        
        
        
    } else {
        window.alert('Selecione pelo menos uma alergia antes de continuar.')
    }
}
