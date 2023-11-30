const db = firebase.firestore()

const form = {
    name: () => document.getElementById('name'),
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    confirmPassword: () => document.getElementById('confirmPassword')
}
function createAccount() {
    const password = form.password().value
    const confirmPassword = form.confirmPassword().value
    if (confirmPassword != password) {
        // Exibir mensagem de "Senhas diferents!"
        window.alert('Algo deu errado, tente novamente.')
    }
    else if (confirmPassword === password) {
        // Realizar cadastro.
        cadastro()
    }    

}
function cadastro() {
    const name = form.name().value
    const email = form.email().value
    const password = form.password().value

    if (!email || !password) {
        window.alert("Preencha todos os campos antes de continuar.")
        return
    }

    Loading()
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        const user = userCredential.user
        const uid = user.uid    
        removeLoading()

        db.collection('users').doc(uid).set({}).then(() =>{
            window.alert("Login efetuado com sucesso!")
            window.location.href = "alergias.html"
        }).catch(error => {
            window.alert(error)
            removeLoading()
        })
        
    }).catch(error => {
        window.alert(error)
    })
}

