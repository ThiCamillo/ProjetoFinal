
// DESPESA //
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

function preencherTabela(dados){
    let tbody = document.getElementById('tbody');
    
    tbody.innerText = '';
    for(let i = 0; i < dados.length; i++){
        let tr = tbody.insertRow();
        let td_iddespesa = tr.insertCell();
        let td_descricao = tr.insertCell();
        let td_datavencimento = tr.insertCell();
        let td_datapagamento = tr.insertCell();
        let td_valor = tr.insertCell();
        let td_acoes = tr.insertCell();

        td_iddespesa.innerText = dados[i].iddespesa;
        td_descricao.innerText = dados[i].descricao;
        td_datavencimento.innerText = dados[i].datavencimento;
        td_datapagamento.innerText = dados[i].datapagamento;
        td_valor.innerText = formatarData(dados[i].dataNascimento);
        
        let editar = document.createElement('button');
        editar.textContent = 'Editar';
        editar.style.height = '30px';
        editar.style.width = '100px';
        editar.style.margin = '5px';
        editar.style.padding = '2px';
        editar.setAttribute('onclick', 'atualizarDespesa('+JSON.stringify(dados[i])+')');
        td_acoes.appendChild(editar);

        let excluir = document.createElement('button');
        excluir.textContent = 'Excluir';
        excluir.style.height = '30px';
        excluir.style.width = '100px';
        excluir.style.margin = '5px';
        excluir.style.padding = '2px';
        excluir.setAttribute('onclick', 'excluirDespesa('+JSON.stringify(dados[i])+')');
        td_acoes.appendChild(excluir);
        
    }
}

function formatarData(data){
    let dataFormatada = new Date(data),
    dia  = dataFormatada.getDate().toString().padStart(2,'0'),
    mes  = (dataFormatada.getMonth()+1).toString().padStart(2,'0'),
    ano  = dataFormatada.getFullYear();
    return dia+"/"+mes+"/"+ano;
}

//function limpar(){
//    form.reset();
//}

limpar.addEventListener('click', (evento) => {
    evento.preventDefault();
    despesa = {};
    form.reset();
})

async function excluirDespesa(dados){
    let options = {
        method: "DELETE",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            iddespesa: dados.iddespesa,
            descricao: dados.descricao,
            valor: dados.valor,
            datavencimento: dados.datavencimento,
            datapagamento: dados.datapagamento 
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/despesa/excluir', options);
    if(resultado.ok == true){
        alert("Exclusão realizada com sucesso.");
        despesa = {};
        listarDespesas();
    } else {
        alert("Houve um problema na exclusão da despesa.");
    }
}

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    if(despesa.iddespesa != undefined){
       atualizarDespesa();
    } else {
       cadastrarDespesa();
    }
})

async function cadastrarDespesa(){
    let options = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            id: 0,
            descricao: document.querySelector('#descricao').value,
            valor: document.querySelector('#valor').value,
            datavencimento: document.querySelector('#datavencimento').value,
            datapagamento: document.querySelector('#datapagamento').value 
        })
    };
    const resultado = await fetch('http://localhost:8080/senhor-financas/rest/despesa/cadastrar', options);
    despesa = await resultado.json();
    if(despesa.iddespesa != 0){
        alert("Cadastro realizado com sucesso.");
        despesa = {};
        listarDespesas();
    } else {
        alert("Houve um problema no cadastro da despesa.");
    }
    form.reset();
}
//parei aqui
async function atualizarPessoa(){
    let options = {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            id: pessoa.id,
            nome: document.querySelector('#nome').value,
            cpf: document.querySelector('#cpf').value,
            email: document.querySelector('#email').value,
            dataNascimento: document.querySelector('#nascimento').value 
        })
    };
    const resultado = await fetch('http://localhost:8080/pessoa/rest/pessoa/atualizar', options);
    if(resultado.ok == true){
        alert("Atualização realizada com sucesso.");
        pessoa = {};
        buscarPessoas();
    } else {
        alert("Houve um problema na atualização da pessoa.");
    }
    form.reset();
}

async function editarPessoa(dados){
    pessoa.id = dados.id;
    document.querySelector('#nome').value = dados.nome;
    document.querySelector('#cpf').value = dados.cpf;
    document.querySelector('#email').value = dados.email; 
    document.querySelector('#nascimento').value = dados.dataNascimento;
}


