const form = document.querySelector('#formulario');
const limpar = document.querySelector('#limpar');

let despesa = {};

async function listarDespesas(){
    let options = {
        method: "GET",
        Headers: {"Content-type": "application/json"}
    };
    const listaDespesas = await fetch('http://localhost:8080/senhor-financas/rest/despesa/listar', options);
    const listaDespesasJson = await listaDespesas.json();
    if(listaDespesasJson.length != 0){
        preencherTabela(listaDespesasJson);
    }else{
        alert("Houve um problema ao listar as despesas.")
    }
}
listarDespesas();

