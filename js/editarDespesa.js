const form = document.querySelector('#formulario');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    editarDespesa();
})

const idDespesa = sessionStorage.getItem('idDespesa');
const dadosDespesa = JSON.parse(sessionStorage.getItem('dadosDespesa'))

document.querySelector('#descricao').value = dadosDespesa.descricao;
document.querySelector('#valor').value = dadosDespesa.valor;
document.querySelector('#dataVencimento').value = dadosDespesa.dataVencimento;
document.querySelector('#dataPagamento').value = dadosDespesa.dataPagamento;

async function editarDespesa(){
    let options = {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            idDespesa: idDespesa,
            descricao: document.querySelector('#descricao').value,
            valor: document.querySelector('#valor').value,
            dataVencimento: document.querySelector('#dataVencimento').value,
            dataPagamento: document.querySelector('#dataPagamento').value
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/despesa/atualizar', options);
    if(resultado.ok == true){
        alert("Despesa atualizada!");
        window.location.href = './modules/despesa/despesa.html';
    } else {
        alert("Falha na atualização.");
        form.reset();
    }
}