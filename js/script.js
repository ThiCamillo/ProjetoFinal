// LOGAR USUARIO

const form = document.querySelector('#formulario');
// const limpar = document.querySelector('#limpar');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    logarUsuario();
})

async function logarUsuario() {
    let options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            login: document.querySelector('#login').value,
            senha: document.querySelector('#senha').value
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/usuario/logar', options);
    const usuarioLogado = await resultado.json();
    if (usuarioLogado.idUsuario != 0) {
        sessionStorage.setItem('idUsuario', usuarioLogado.idUsuario.toString());
        window.location.href = './modules/receita/receita.html';
    } else {
        alert("Login ou Senha incorretos.");
        form.reset();
    }
}
