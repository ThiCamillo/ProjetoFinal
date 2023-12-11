const buscar = document.querySelector('#buscar');

buscar.addEventListener('click', (evento) => {
    evento.preventDefault();
    buscarReceitas();
})

async function buscarReceitas() {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const listaReceitas = await fetch('http://localhost:8080/senhor-financas/rest/receita/listar/' + idUsuario);
    const listaReceitasJson = await listaReceitas.json();
    if (listaReceitasJson.length != 0) {
        const total = calcularFooter(listaReceitasJson);
        preencherTabela(listaReceitasJson, total);
    } else {
        alert("Houve um problema na busca das receitas.");
    }
}

function preencherTabela(listaReceitasJson, total) {
    let tbody = document.getElementById('tbody');
    const tfoot = document.getElementById('tfoot');

    tbody.innerText = '';
    tfoot.removeChild(tfoot.firstChild);
    for (let i = 0; i < listaReceitasJson.length; i++) {
        let tr = tbody.insertRow();
        let td_id = tr.insertCell();
        let td_descricao = tr.insertCell();
        let td_dataReceita = tr.insertCell();
        let td_valor = tr.insertCell();
        let td_acoes = tr.insertCell();

        td_id.innerText = listaReceitasJson[i].idReceita;
        td_descricao.innerText = listaReceitasJson[i].descricao;
        td_dataReceita.innerText = formatarData(listaReceitasJson[i].dataReceita);
        td_valor.innerText = listaReceitasJson[i].valor;

        let editar = document.createElement('button');
        editar.textContent = 'Editar';
        editar.setAttribute('onclick', 'editarReceita(' + JSON.stringify(listaReceitasJson[i]) + ')');
        td_acoes.className = 'botao'
        td_acoes.appendChild(editar);

        let excluir = document.createElement('button');
        excluir.textContent = 'Excluir';
        excluir.setAttribute('onclick', 'excluirReceita(' + JSON.stringify(listaReceitasJson[i]) + ')');
        td_acoes.appendChild(excluir);

    }

    const tr = tfoot.insertRow()
    const td = tr.insertCell()
    td.innerText = `Total : ${total}`;
    td.setAttribute('colspan', 5);
}

function calcularFooter(receitas) {
    let total = 0
    receitas.forEach(receita => {
        total = total + receita.valor
    })
    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatarData(data) {
    let dataFormatada = new Date(data),
        dia = dataFormatada.getDate().toString().padStart(2, '0'),
        mes = (dataFormatada.getMonth() + 1).toString().padStart(2, '0'),
        ano = dataFormatada.getFullYear();
    return dia + "/" + mes + "/" + ano;
}

async function excluirReceita(receitas) {
    let options = {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            idReceita: receitas.idReceita,
            descricao: receitas.descricao,
            data: receitas.dataReceita,
            valor: receitas.valor,
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/receita/excluir', options);
    if (resultado.ok == true) {
        alert("Receita excluida.");
        buscarReceitas();
    } else {
        alert("Houve um problema na exclusão da Receita.");
    }
}

async function editarReceita(receitas) {
    sessionStorage.setItem('idReceita', receitas.idReceita);
    sessionStorage.setItem('dadosReceita', JSON.stringify(receitas));
    window.location.href = 'editarReceita.html';
}
