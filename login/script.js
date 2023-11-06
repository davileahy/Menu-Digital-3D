const db = firebase.firestore()

const form = {
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
    const email = form.email().value
    const password = form.password().value
    Loading()
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        const user = userCredential.user
        const uid = user.uid    
        removeLoading()
        db.collection('usuários').doc(uid).set({}).then(() =>{
            window.alert("Login efetuado com sucesso!")
            window.location.href = "alergias.html"
        }).catch(error => {
            window.alert(error)
        })
        
    }).catch(error => {
        window.alert(error)
    })
}

