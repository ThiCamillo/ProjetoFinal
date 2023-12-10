const form = document.querySelector('#formulario');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    cadastrarReceita();
})

async function cadastrarReceita() {
    const usuario = sessionStorage.getItem('idUsuario');
    let options = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            idUsuario: usuario,
            descricao: document.querySelector('#descricao').value,
            dataReceita: document.querySelector('#date').value,
            valor: document.querySelector('#valor').value
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/receita/cadastrar', options);
    const receita = await resultado.json();
    if(receita.idReceita != 0){
        alert("Receita cadastrada com sucesso!");
        window.location.href = 'receita.html';
    } else {
        alert("Falha no cadastro da receita");
        form.reset();
    }
}
