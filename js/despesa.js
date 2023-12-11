const buscar = document.querySelector('#buscar');

buscar.addEventListener('click', (evento) => {
    evento.preventDefault();
    buscarDespesas();
})

async function buscarDespesas() {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const listaDespesas = await fetch('http://localhost:8080/senhor-financas/rest/despesa/listar/' + idUsuario);
    const listaDespesasJson = await listaDespesas.json();
    if (listaDespesasJson.length != 0) {
        const totalFooter = calcularFooter(listaDespesasJson);
        preencherTabela(listaDespesasJson, totalFooter);
    } else {
        alert("Houve um problema na busca das despesas.");
    }
}

function preencherTabela(listaDespesasJson, totalFooter) {
    let tbody = document.getElementById('tbody');
    const tfoot = document.getElementById('tfoot');

    tbody.innerText = '';
    tfoot.removeChild(tfoot.firstChild);
    for (let i = 0; i < listaDespesasJson.length; i++) {
        let tr = tbody.insertRow();
        let td_id = tr.insertCell();
        let td_descricao = tr.insertCell();
        let td_dataVencimento = tr.insertCell();
        let td_dataPagamento = tr.insertCell();
        let td_valor = tr.insertCell();
        let td_acoes = tr.insertCell();

        td_id.innerText = listaDespesasJson[i].idDespesa;
        td_descricao.innerText = listaDespesasJson[i].descricao;
        td_dataVencimento.innerText = formatarData(listaDespesasJson[i].dataVencimento);
        if (listaDespesasJson[i].dataPagamento != null) {
            td_dataPagamento.innerText = formatarData(listaDespesasJson[i].dataPagamento);
        } else {
            td_dataPagamento.innerText = null;
        }
        td_valor.innerText = listaDespesasJson[i].valor;

        let editar = document.createElement('button');
        editar.textContent = 'Editar';
        editar.setAttribute('onclick', 'editarDespesa(' + JSON.stringify(listaDespesasJson[i]) + ')');
        td_acoes.className = 'botao'
        td_acoes.appendChild(editar);

        let excluir = document.createElement('button');
        excluir.textContent = 'Excluir';
        excluir.setAttribute('onclick', 'excluirDespesa(' + JSON.stringify(listaDespesasJson[i]) + ')');
        td_acoes.appendChild(excluir);

    }

    const tr = tfoot.insertRow()
    const td = tr.insertCell()
    td.innerText = `Total : ${totalFooter}`;
    td.setAttribute('colspan', 6);
}

function calcularFooter(despesas) {
    let total = 0
    despesas.forEach(despesa => {
        total = total + despesa.valor
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

async function excluirDespesa(despesas) {
    let options = {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            idDespesa: despesas.idDespesa,
            descricao: despesas.descricao,
            dataVencimento: despesas.dataVencimento,
            dataPagamento: despesas.dataPagamento,
            valor: despesas.valor,
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/despesa/excluir', options);
    if (resultado.ok == true) {
        alert("Despesa excluida.");
        buscarDespesas();
    } else {
        alert("Houve um problema na exclusão da Despesa.");
    }
}

async function editarDespesa(despesas) {
    sessionStorage.setItem('idDespesa', despesas.idDespesa);
    sessionStorage.setItem('dadosDespesa', JSON.stringify(despesas));
    window.location.href = 'editarDespesa.html';
}