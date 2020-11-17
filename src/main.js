class Personagem{
    constructor(id, nomePrsn, estadoPrsn, desejoPrsn, atividadePrsn){
        this.id = id;
        this.nomePrsn = nomePrsn;
        this.estadoPrsn = estadoPrsn;
        this.desejoPrsn = desejoPrsn;
        this.atividadePrsn = atividadePrsn;
        this.alimentacaoPrsn = 100;
        this.estadoMentalPrsn = 100;
    }
}
let sobrenomes = ["Dias", "Lima", "Alves"];
sobrenome = sobrenomes[Math.floor(Math.random() * 3)];
// Variáveis de estado
let personagens = [
    new Personagem("p01", "Catílina "+sobrenome, "Bem", "Comer Macarrão", "Nenhuma"), 
    new Personagem("p02", "Leonardo "+sobrenome, "Tossindo", "Ver TV", "Nenhuma"), 
    new Personagem("p03", "Paola "+sobrenome, "Dor de cabeça", "Sair com os amigos", "Nenhuma"), 
    new Personagem("p04", "Vanessa "+sobrenome, "Nauseada", "Ir a Academia", "Nenhuma")
];
let divFamilia = document.getElementById("family-view");
let divCasa = document.querySelector("#house-view");
let titulo = document.querySelector("header > h1");
let dropdowns = divFamilia.getElementsByClassName("drop-tarefas");
let gameState = 'status';

/* ESTADO DO JOGO */

function substituirTexto(elemento, campo, valor){
    elemento.innerHTML = elemento.innerHTML.replace("{{"+campo+"}}", valor);
}
function carregaDivsStatus() {
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


/* NAVEGAÇÃO */

function loadPage(nomePagina){
    location.href=nomePagina+'.html';
}
function telaAlocacao(){
    let statusBars = divFamilia.querySelectorAll(".bar");

    titulo.innerText = "Alocação de Tarefas";
    statusBars.forEach(barra => {
        barra.style.display = "none";
    });
    for(let item of dropdowns){
        item.removeAttribute("style");
    }

    divCasa.style.display = "none";
}
function telaStatus(){
    let statusBars = divFamilia.querySelectorAll(".bar");

    titulo.innerText = "Estado da Família";
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

// window.onbeforeunload = function() {
//     var message = 'Ao sair, seu jogo atual será encerrado!';
//     return message;
// }