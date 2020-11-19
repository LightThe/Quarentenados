class Personagem {
    constructor(nome) {
        this.nome = nome
        this.atividade = 0
        // Campos de texto
        this.info = {
            saude: "Bem",
            desejo: "Nada"
        }
        // Campos de porcentagem
        this.estado = {
            alimentacao: 100,
            mental: 100
        }
    }
}

// Variáveis de estado
const sobrenomes = [
    "Dias",
    "Lima",
    "Alves",
    "Ferreira",
    "Silva",
    "Domingos",
    "Almeida",
    "Gomes",
    "Martins",
    "Pinto"
]
const nomes = [
    "Gabriel",
    "Victor",
    "Theo",
    "Guilherme",
    "Luiza",
    "Amanda",
    "Patrícia",
    "Mario",
    "Fernando",
    "João",
    "Maria",
    "Catílina",
    "Leonardo",
    "Paola",
    "Vanessa",
    "Luigi",
    "Vânia",
    "Marcos",
    "Everaldo",
    "Juliane",
    "Yara",
    "Yago",
    "Ian",
    "Bernardo",
    "Alessandro",
    "Caio",
    "Marcelo",
    "Narciso",
    "Bartolomeu",
    "Vinicius",
    "Carlos",
    "Xian",
    "Zahra",
    "Laís",
    "Kéfera",
    "Jorge",
    "Hércules",
    "Gustavo",
    "Fred",
    "Daniel",
    "Sharlene",
    "André",
    "Puma",
    "Otávio",
    "Iúna",
    "Ulisses",
    "Yáskara",
    "Tiago",
    "Raimundo",
    "Estevan",
    "Walisson",
    "Quésia"
]
sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)]

let casa;
let personagens;
let game = {
    state: "status",
    turnos: 0,
    finalRuim: false,
    nomeFamilia: ""
};

// popula os personagens
// tenta ler da máquina
if (localStorage.getItem("jogo")) {
    personagens = JSON.parse(localStorage.getItem("jogo")).personagens
    casa = JSON.parse(localStorage.getItem("jogo")).casa
} else {
    personagens = [
        new Personagem(
            nomes[Math.floor(Math.random() * nomes.length)] + " " + sobrenome
        ),
        new Personagem(
            nomes[Math.floor(Math.random() * nomes.length)] + " " + sobrenome
        ),
        new Personagem(
            nomes[Math.floor(Math.random() * nomes.length)] + " " + sobrenome
        ),
        new Personagem(
            nomes[Math.floor(Math.random() * nomes.length)] + " " + sobrenome
        )
    ]
    casa = {
        alimento: 75,
        dinheiro: 75,
        medicamento: 75,
        estado: 100
    }
    persistir()
}

// Referencias armazenadas
const divFamilia = document.getElementById("family-view")
const divCasa = document.querySelector("#house-view")
const titulo = document.querySelector("header > h1")
const botaoPrincipal = document.querySelector("#change-view")
// necessario para converter de HTMLCollection para Array
const dropdowns = divFamilia.getElementsByClassName("drop-tarefas")

/* UTILIDADES */

function loadPage(nomePagina) {
    location.href = nomePagina + ".html"
}
function persistir() {
    localStorage.setItem("jogo", JSON.stringify({ personagens, casa }))
}

/* AÇÕES */
// cada objeto representa uma ação. Seus campos "efeitos" representam as mudanças que ele realiza
definicao = [
    {
        nome: "Selecionar"
    },
    {
        nome: "Cuidar da casa",
        efeitos: {
            risco: 1,
            personagem: {
                mental: -20,
                alimentacao: 15
            },
            casa: {
                alimento: -5,
                estado: 50
            }
        }
    },
    {
        nome: "Ir ao mercado",
        efeitos: {
            risco: 30,
            personagem: {
                mental: 5,
                alimentacao: -10
            },
            casa: {
                alimento: 60,
                dinheiro: -40
            }
        }
    },
    {
        nome: "Comprar medicamentos",
        efeitos: {
            risco: 30,
            personagem: {
                mental: -5,
                alimentacao: -10
            },
            casa: {
                medicamento: 40,
                dinheiro: -60
            }
        }
    },
    {
        nome: "Caminhar no parque",
        efeitos: {
            risco: 10,
            personagem: {
                mental: 30,
                alimentacao: -20
            }
        }
    },
    {
        nome: "Comer fora",
        efeitos: {
            risco: 20,
            personagem: {
                mental: 20,
                alimentacao: 50
            },
            casa: {
                dinheiro: -15
            }
        }
    },
    {
        nome: "Passar o tempo",
        efeitos: {
            risco: 1,
            personagem: {
                mental: -10,
                alimentacao: 15
            },
            casa: {
                alimento: -5
            }
        }
    },
    {
        nome: "Ir para academia",
        efeitos: {
            risco: 15,
            personagem: {
                mental: 20,
                alimentacao: -30
            },
            casa: {
                dinheiro: -10
            }
        }
    },
    {
        nome: "Estudar",
        efeitos: {
            risco: 1,
            personagem: {
                mental: 10,
                alimentacao: 15
            },
            casa: {
                alimento: -5
            }
        }
    },
    {
        nome: "Trabalhar",
        efeitos: {
            risco: 15,
            personagem: {
                mental: -20,
                alimentacao: -20
            },
            casa: {
                dinheiro: 25
            }
        }
    },
    {
        nome: "Sair com amigos",
        efeitos: {
            risco: 35,
            personagem: {
                mental: 50,
                alimentacao: -15
            },
            casa: {
                dinheiro: -10
            }
        }
    },
    {
        nome: "Cozinhar uma bela refeição",
        efeitos: {
            risco: 1,
            personagem: {
                mental: 15,
                alimentacao: 50
            },
            casa: {
                estado: -10,
                alimento: -20
            }
        }
    },
    {
        nome: "Plantar vegetais",
        efeitos: {
            risco: 5,
            personagem: {
                mental: 40,
                alimentacao: -10
            },
            casa: {
                alimento: 30
            }
        }
    },
    {
        nome: "Catar manga",
        efeitos: {
            risco: 15,
            personagem: {
                mental: 30,
                alimentacao: 30
            },
            casa: {
                alimento: 5
            }
        }
    },
    {
        nome: "Roubar goiaba do vizinho",
        efeitos: {
            risco: 20,
            personagem: {
                mental: 50,
                alimentacao: 30
            },
            casa: {
                alimento: 5
            }
        }
    },
    {
        nome: "Vender sua arte",
        efeitos: {
            risco: 30,
            personagem: {
                mental: 10,
                alimentacao: -20
            },
            casa: {
                dinheiro: 20
            }
        }
    },
    {
        nome: "Caçar passarinho",
        efeitos: {
            risco: 15,
            personagem: {
                mental: -20,
                alimentacao: 50
            },
            casa: {
                alimento: 30
            }
        }
    }
]

/* ESTADO DO JOGO */

function atualizaTela() {
    // pega um objeto (dicionario). Para cada um de seus atributos, encontra o elemento (no container) de classe "_[nome do atributo]". Aplica a função callback nesses elementos, e já passa também para a callback o valor do atributo correspondente.
    function atualizaCampos(dicionario, container, callback) {
        Object.keys(dicionario).forEach((atributo) => {
            elemento = container.querySelector(`._${atributo}`)
            // console.log(
            //     `Campo: ${atributo} | Valor: ${dicionario[atributo]} | Elemento: ${elemento}`
            // )
            // como ainda não se sabe a maneira correta de atualizar esse elemento, usamos um callback
            // passamos o elemento e o valor consultado no dicionario que ele irá receber (talvez no innerHTML, talvez no campo value, etc)
            callback(elemento, dicionario[atributo])
        })
    }

    // Atualiza a visão dos personagens
    personagens.forEach((personagem, id) => {
        // console.log(personagem, id)
        const divPersonagem = divFamilia.querySelector(`#p${id}`)
        // Atualiza campos de texto
        atualizaCampos(
            personagem.info,
            divPersonagem,
            (elemento, novo_valor) => {
                elemento.innerHTML = novo_valor
            }
        )
        // Atualiza campos de porcentagem
        atualizaCampos(
            personagem.estado,
            divPersonagem,
            (elemento, novo_valor) => {
                elemento.style = `--fill: ${novo_valor}%`
            }
        )

        // atualiza a atividade atual do personagem
        divPersonagem.querySelector("._atividade").innerHTML =
            personagem.atividade
    })

    // Atualiza a visão da casa
    atualizaCampos(casa, divCasa, (elemento, novo_valor) => {
        elemento.style = `--fill: ${novo_valor}%`
    })
}

function atualizaAcoes(modelo) {
    const select = modelo.querySelector(".drop-tarefas select")

    // para cada ação cria uma opção
    definicao.forEach((acao, id) => {
        const opcao = document.createElement("option")
        opcao.value = id
        opcao.innerHTML = acao.nome
        select.appendChild(opcao)
    })
}

function carregaDivsStatus() {
    const modelo = document.getElementById("modelo-personagem")
    atualizaAcoes(modelo)

    personagens.forEach((personagem, id) => {
        const clone = modelo.cloneNode(true)
        clone.id = `p${id}`
        clone.querySelector("h1").innerHTML = personagem.nome
        clone.classList.remove("hidden")
        divFamilia.appendChild(clone)
    })
    modelo.remove()
    atualizaTela()
}

function validarAcoes() {
    // Verirfica se todas as ações selecionadas diferem da opção "Selecionar", que é o primeiro item
    for (drop of dropdowns) {
        const value = drop.querySelector("select").value
        // console.log(value)
        if (value == 0) return false
    }
    return true
}

function consumir(acao, id) {
    // não deve ser possível passar o turno com a opção "Selecionar" selecionada
    if (acao.nome === "Selecionar")
        throw "Por favor, selecione uma ação para cada personagem"
    // atualiza o estado do personagem
    // a partir da convenção de que os personagens e os efeitos têm as mesmas chaves para cada campo, passa por cada nome de campo e atualiza seu valor
    const atributos = Object.keys(acao.efeitos.personagem)
    atributos.forEach((atributo) => {
        personagens[id].estado[atributo] += acao.efeitos.personagem[atributo]
        personagens[id].estado[atributo] = Math.max(
            Math.min(personagens[id].estado[atributo], 100),
            0
        )
        // Garante que não passe de nenhum limite
    })

    // atualiza o estado da casa
    // segue a mesma convenção
    if (acao.efeitos.casa) {
        const atributos = Object.keys(acao.efeitos.casa)
        atributos.forEach((atributo) => {
            casa[atributo] += acao.efeitos.casa[atributo]
            casa[atributo] = Math.max(Math.min(casa[atributo], 100), 0)
        })
    }

    // Zera a ação selecionada do personagem
    personagens[id].atividade = 0
}

// A função de avançar turnos, que pega o número da ação selecionada para cada personagem
function avancarTurno() {
    if (!validarAcoes()) {
        alert("Por favor, selecione uma ação para cada personagem")
        return
    }
    personagens.forEach((personagem, id) => {
        const select = divFamilia.querySelector(`#p${id} select`)
        personagem.atividade = select.value
        const acao = select.value
        // console.log(acao)
        consumir(definicao[acao], id)
    })
    // Desconta do estado da casa
    casa.estado -= 20

    // Atualiza o contador de turnos
    game.turnos ++;

    atualizaTela()
    persistir()
}

function mostraGIF() {
    gif = document.getElementById("gif-carregando")

    gif.classList = ["ativa"]
    setTimeout(() => {
        gif.classList = ["desativa"]
        setTimeout(() => (gif.classList = []), 1000)
    }, 2000)
}

/* NAVEGAÇÃO */

function tela(tit, botao) {
    titulo.innerText = tit
    botaoPrincipal.innerText = botao

    document.getElementsByTagName("main")[0].classList = [game.state]
}

function changeState() {
    let maxTurnos = 10;
    if (game.state == "alocacao") {
        mostraGIF()
        game.state = "status"
        // Espera a animação acontecer
        setTimeout(() => {
            avancarTurno()
            tela("Estado da Família", "Designar Tarefas")
        }, 1000)
    } else {
        //Verifica se ele pode terminar o jogo
        if(game.turnos >= maxTurnos){
            game.nomeFamilia = personagens[0].nome.split(" ")[1]; // Todas as vezes a variavel sobrenome vem diferente do da família, portanto fiz esse gato.
            localStorage.setItem("gameState", JSON.stringify(game));
            loadPage('fim-jogo');
        }
        //Continua o jogo
        game.state = "alocacao"
        tela("Alocação de Tarefas", "Concluir Ações")
    }
}
