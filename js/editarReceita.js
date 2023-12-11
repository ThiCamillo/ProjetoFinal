const form = document.querySelector('#formulario');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    editarReceita();
})

const idReceita = sessionStorage.getItem('idReceita');
const dadosReceita = JSON.parse(sessionStorage.getItem('dadosReceita'))

document.querySelector('#descricao').value = dadosReceita.descricao;
document.querySelector('#valor').value = dadosReceita.valor;
document.querySelector('#date').value = dadosReceita.dataReceita; 

async function editarReceita(){
    let options = {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            idReceita: idReceita,
            descricao: document.querySelector('#descricao').value,
            dataReceita: document.querySelector('#date').value,
            valor: document.querySelector('#valor').value
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/receita/atualizar', options);
    if(resultado.ok == true){
        alert("Receita atualizada!");
        window.location.href = 'receita.html';
        // buscarReceitas();
    } else {
        alert("Falha na atualização.");
        form.reset();
    }
}
