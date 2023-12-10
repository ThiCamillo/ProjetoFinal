const form = document.querySelector('#formulario');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    cadastrarDespesa();
})

async function cadastrarDespesa() {
    const usuario = sessionStorage.getItem('idUsuario');
    let options = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            idUsuario: usuario,
            descricao: document.querySelector('#descricao').value,
            valor: document.querySelector('#valor').value,
            dataVencimento: document.querySelector('#dataVencimento').value,
            dataPagamento: document.querySelector('#dataPagamento').value
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/despesa/cadastrar', options);
    const despesa = await resultado.json();
    if(despesa.idDespesa != 0){
        alert("Despesa cadastrada com sucesso!");
        window.location.href = './modules/despesa/despesa.html';
    } else {
        alert("Falha no cadastro da despesa");
        form.reset();
    }
}
