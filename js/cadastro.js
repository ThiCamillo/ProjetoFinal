const form = document.querySelector('#formulario');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    cadastrarUsuario();
})

async function cadastrarUsuario() {
    let options = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            idUsuario: 0,
            nome: document.querySelector('#nome').value,
            cpf: document.querySelector('#cpf').value,
            email: document.querySelector('#email').value,
            dataNascimento: document.querySelector('#date').value,
            login: document.querySelector('#login').value,
            senha: document.querySelector('#senha').value
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/usuario/cadastrar', options);
    const usuario = await resultado.json();
    if(usuario.idUsuario != 0){
        alert("Cadastro realizado com sucesso!");
        window.location.href = 'index.html';
    } else {
        alert("Usuário já cadastrado.");
        form.reset();
    }
}