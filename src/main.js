class Personagem{
    constructor(id, nomePrsn, estadoPrsn, desejoPrsn){
        this.id = id;
        this.nomePrsn = nomePrsn;
        this.estadoPrsn = estadoPrsn;
        this.desejoPrsn = desejoPrsn;
        this.atividadePrsn = 0;
        this.alimentacaoPrsn = 100;
        this.estadoMentalPrsn = 100;
        this.acaoAtual;
    }
}
//classe para armazenar ações, personagens devem conseguir selecionar uma instância usando o ID
class Acao{
    constructor(id, nomeAcao, duracaoAcao, efeitoSaude, efeitoAlim, contaminAcao, estoqueComida){
        this.id = id;
        this.nomeAcao = nomeAcao;
        this.duracaoAcao = duracaoAcao;
        this.efeitoSaude = efeitoSaude;
        this.efeitoAlim = efeitoAlim;
        this.contaminAcao = contaminAcao;
        this.estoqueComida = estoqueComida;
    }
}

// Variáveis de estado
let sobrenomes = ["Dias", "Lima", "Alves"];
sobrenome = sobrenomes[Math.floor(Math.random() * 3)];
let personagens = [
    new Personagem("p01", "Catílina "+sobrenome, "Bem", "Catar Manga", ""), 
    new Personagem("p02", "Leonardo "+sobrenome, "Bem", "Ver TV", ""), 
    new Personagem("p03", "Paola "+sobrenome, "Bem", "Sair com os amigos", ""), 
    new Personagem("p04", "Vanessa "+sobrenome, "Bem", "Ir a Academia", "")
];
let gameState = 'status';

// Referencias armazenadas
let divFamilia = document.getElementById("family-view");
let divCasa = document.querySelector("#house-view");
let titulo = document.querySelector("header > h1");
let botaoPrincipal = document.querySelector("#change-view");
let dropdowns = divFamilia.getElementsByClassName("drop-tarefas");


/* UTILIDADES */

function loadPage(nomePagina){
    location.href=nomePagina+'.html';
}
function substituirTexto(elemento, campo, valor){
    elemento.innerHTML = elemento.innerHTML.replace("{{"+campo+"}}", valor);
}


/* ESTADO DO JOGO */

function carregaDivsStatus() {
    //Essa função precisa ser refatorada de uma forma menos burra
    let divModelo = document.getElementById("modelo-personagem");
    
    personagens.forEach(personagem => { 
        let clonediv = divModelo.cloneNode(true);
        clonediv.id = personagem.id;
        
        substituirTexto(clonediv, "nomePrsn", personagem.nomePrsn);
        substituirTexto(clonediv, "estadoPrsn", personagem.estadoPrsn);
        substituirTexto(clonediv, "desejoPrsn", personagem.desejoPrsn);
        substituirTexto(clonediv, "atividadePrsn", personagem.atividadePrsn);

        let statusBars = clonediv.getElementsByClassName("bar");
        let barraAlimento = statusBars[0].children[1]
        let barraEstdMental = statusBars[1].children[1]
        barraAlimento.outerHTML = barraAlimento.outerHTML.replace("--fill: 82%", "--fill: "+personagem.alimentacaoPrsn+"%");
        barraEstdMental.outerHTML = barraEstdMental.outerHTML.replace("--fill: 63%", "--fill: "+personagem.estadoMentalPrsn+"%");
        
        clonediv.removeAttribute("style");
        divFamilia.appendChild(clonediv);
    });
    divModelo.remove();
}

//A função de avançar turnos, que pega o número da ação selecionada para cada personagem
function avancarTurno(){
    personagens.forEach(personagem => {
        let teste = divFamilia.querySelector("#"+personagem.id);
        let selectPrsn = teste.querySelector("select");
        personagem.atividadePrsn = selectPrsn.value;
    });
}


/* NAVEGAÇÃO */

function telaAlocacao(){
    titulo.innerText = "Alocação de Tarefas";
    botaoPrincipal.innerText = "Concluir Ações";
    
    let statusBars = divFamilia.querySelectorAll(".bar");
    statusBars.forEach(barra => {
        barra.style.display = "none";
    });
    for(let item of dropdowns){
        item.removeAttribute("style");
    }

    divCasa.style.display = "none";
}
function telaStatus(){

    titulo.innerText = "Estado da Família";
    botaoPrincipal.innerText = "Designar Tarefas";
    
    let statusBars = divFamilia.querySelectorAll(".bar");
    statusBars.forEach(barra => {
        barra.removeAttribute("style");
    });
    for(let item of dropdowns){
        item.style.display = "none";
    }

    divCasa.removeAttribute("style");
}
function changeState(){
    if (gameState == 'alocacao') {
        telaStatus();
        gameState = 'status';
    } else {
        telaAlocacao();
        gameState = 'alocacao';
    }
}