class Personagem{
    constructor(nomePrsn, estadoPrsn, desejoPrsn, atividadePrsn){
        this.nomePrsn = nomePrsn;
        this.estadoPrsn = estadoPrsn;
        this.desejoPrsn = desejoPrsn;
        this.atividadePrsn = atividadePrsn;
        this.alimentacaoPrsn = 100;
        this.estadoMentalPrsn = 100;
    }
}

var personagens = [
    new Personagem("Catílina Lima", "Bem", "Comer Macarrão", "Nenhuma"), 
    new Personagem("Leonardo Lima", "Tossindo", "Ver TV", "Nenhuma"), 
    new Personagem("Paola Lima", "Dor de cabeça", "Sair com os amigos", "Nenhuma"), 
    new Personagem("Vanessa Lima", "Nauseada", "Ir a Academia", "Nenhuma")
];
var familyDiv = document.getElementById("family-view");

function carregaDivsStatus() {
    personagens.forEach(personagem => { 
        var divPersonagem = document.getElementById("modelo-personagem");

        var clonediv = divPersonagem.cloneNode(true);
        clonediv.id = personagem.nomePrsn;
        clonediv.removeAttribute("style");
        clonediv.innerHTML = clonediv.innerHTML.replace("{{nomePrsn}}", personagem.nomePrsn);
        clonediv.innerHTML = clonediv.innerHTML.replace("{{estadoPrsn}}", personagem.estadoPrsn);
        clonediv.innerHTML = clonediv.innerHTML.replace("{{desejoPrsn}}", personagem.desejoPrsn);
        clonediv.innerHTML = clonediv.innerHTML.replace("{{atividadePrsn}}", personagem.atividadePrsn);
        // TODO: refatorar esse monte de replace em alguma coisa mais limpa, por enquanto funciona
        var statusBars = clonediv.getElementsByClassName("bar");
        var barraAlimento = statusBars[0].children[1]
        var barraEstdMental = statusBars[1].children[1]
        barraAlimento.outerHTML = barraAlimento.outerHTML.replace("--fill: 82%", "--fill: "+personagem.alimentacaoPrsn+"%");
        barraEstdMental.outerHTML = barraEstdMental.outerHTML.replace("--fill: 63%", "--fill: "+personagem.estadoMentalPrsn+"%");
        
        familyDiv.appendChild(clonediv);
    });
}
document.onload = carregaDivsStatus();