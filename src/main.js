// Configurações
const config = {
    maxTurnos: 10,
    // cadencia o efeito negativo causado sobre a saud emental do personagem com base no estado da casa
    efeitoBagunca: 0.3,
    // quantos pontos de estado a casa perde por turno
    velocidadeBagunca: 20,
    // cadencia o efeito negativo que estar doente causa nos resultados das ações
    efeitoDoenca: 0.3
}

class Personagem {
    constructor(nome) {
        this.nome = nome
        this.atividade = 0
        // 0 = bem; aumenta 1 por turno doente; retorna pra 0 quando curado
        this.doente = 0
        // Campos de texto
        this.info = {
            saude: "Bem",
            desejo: "Nada"
        }
        // Campos de porcentagem
        this.estado = {
            fisico: 100,
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

let casa
let personagens
let game

// carrega o jogo
// tenta ler da máquina
if (localStorage.getItem("jogo")) {
    personagens = JSON.parse(localStorage.getItem("jogo")).personagens
    casa = JSON.parse(localStorage.getItem("jogo")).casa
    game = JSON.parse(localStorage.getItem("jogo")).game
} else {
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)]
    personagens = [
        new Personagem(nomes[Math.floor(Math.random() * nomes.length)]),
        new Personagem(nomes[Math.floor(Math.random() * nomes.length)]),
        new Personagem(nomes[Math.floor(Math.random() * nomes.length)]),
        new Personagem(nomes[Math.floor(Math.random() * nomes.length)])
    ]
    casa = {
        alimento: 75,
        dinheiro: 75,
        medicamento: 75,
        estado: 100
    }
    game = {
        state: "status",
        turnos: 0,
        finalRuim: false,
        nomeFamilia: sobrenome
    }
    persistir()
}

// Referencias armazenadas
const divFamilia = document.getElementById("family-view")
const divCasa = document.querySelector("#house-view")
const titulo = document.querySelector("header > h1")
const botaoPrincipal = document.querySelector("#change-view")
const dropdowns = divFamilia.getElementsByClassName("drop-tarefas")

/* UTILIDADES */

function loadPage(nomePagina) {
    location.href = nomePagina + ".html"
}
function persistir() {
    localStorage.setItem("jogo", JSON.stringify({ personagens, casa, game }))
}
// Armazena o custo total de recursos na passagem de turnos
let recursosDescontados

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
                fisico: 15
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
                fisico: -10
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
                fisico: -10
            },
            casa: {
                medicamento: 100,
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
                fisico: -20
            }
        }
    },
    {
        nome: "Comer fora",
        efeitos: {
            risco: 20,
            personagem: {
                mental: 20,
                fisico: 50
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
                fisico: 15
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
                fisico: -30
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
                fisico: 15
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
                fisico: -20
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
                fisico: -15
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
                fisico: 50
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
                fisico: -10
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
                fisico: 30
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
                fisico: 30
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
                fisico: -20
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
                fisico: 50
            },
            casa: {
                alimento: 30
            }
        }
    },
    {
        nome: "Ir ao Hospital",
        efeitos: {
            risco: -1,
            personagem: {
                mental: 10,
                fisico: 10
            },
            casa: {
                medicamento: -100,
                dinheiro: -30
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
        // Atualiza a saúde dele
        divPersonagem.classList = [personagem.info.saude.toLowerCase()]
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
        clone.querySelector(
            "h1"
        ).innerHTML = `${personagem.nome} ${game.nomeFamilia}`
        clone.classList.remove("hidden")
        divFamilia.appendChild(clone)
    })
    modelo.remove()
    atualizaTela()
}

function validarAcoes() {
    // Armazena a diferença que cada ação vai fazer nos recursos da casa
    // para ao final verificar se existem recursos o suficiente para tal
    recursosDescontados = { ...casa }
    for (drop of dropdowns) {
        const acao = definicao[drop.querySelector("select").value]
        // console.log(acao)
        // Verirfica se todas as ações selecionadas diferem da opção "Selecionar", que é o primeiro item
        if (acao.nome == "Selecionar")
            throw "Por favor, selecione uma ação para cada personagem"

        // Contabiliza o efeito desta ação sobre os recursos
        if (acao.efeitos.casa) {
            const atributos = Object.keys(acao.efeitos.casa)
            atributos.forEach(
                (atributo) =>
                    (recursosDescontados[atributo] +=
                        acao.efeitos.casa[atributo])
            )
        }
    }
    // Passa por cada recurso da casa e verifica se algum valor ficou negativo, indicando que não há recurso o suficiente
    for (recurso of Object.keys(recursosDescontados)) {
        if (recursosDescontados[recurso] < 0)
            throw `O recurso ${recurso} é insuficiente para executar todas essas ações!\nNomeie um personagem para coletá-lo ou tente uma combinação que gaste-o menos.`
    }
}

function consumir(acao, id) {
    // não deve ser possível passar o turno com a opção "Selecionar" selecionada
    if (acao.nome === "Selecionar")
        throw "Por favor, selecione uma ação para cada personagem"
    // Verifica se o personagem está contaminado e aumenta o turno doente
    if (personagens[id].doente > 0) {
        personagens[id].doente++
    }
    // Aplica o risco de se contaminar
    else if (Math.floor(Math.random() * 100) <= acao.efeitos.risco) {
        personagens[id].info.saude = "Doente"
        personagens[id].doente = 1
    }
    if (acao.efeitos.risco < 0) {
        // Condição especial, ação de cura
        personagens[id].doente = 0
        personagens[id].info.saude = "Bem"
    }
    // atualiza o estado do personagem
    // a partir da convenção de que os personagens e os efeitos têm as mesmas chaves para cada campo, passa por cada nome de campo e atualiza seu valor
    const atributos = Object.keys(acao.efeitos.personagem)
    atributos.forEach((atributo) => {
        // Se o efeito da ação for negativo aumenta em 30% a queda dos valores por turno doente. Se for positivo, diminui em 30%.
        const efeito = acao.efeitos.personagem[atributo]
        if (efeito < 0)
            personagens[id].estado[atributo] +=
                efeito * (1 + personagens[id].doente * config.efeitoDoenca)
        else
            personagens[id].estado[atributo] +=
                efeito - efeito * personagens[id].doente * config.efeitoDoenca
        // Garante que não passe de nenhum limite
        personagens[id].estado[atributo] = Math.min(
            personagens[id].estado[atributo],
            100
        )
    })

    // Não é necessário contabilizar o efeito sobre a casa, pois o resultado dessas contabilizações está armazenado na variável recursosDescontados

    // Zera a ação selecionada do personagem
    personagens[id].atividade = 0
}

// A função de avançar turnos, que pega o número da ação selecionada para cada personagem
function avancarTurno() {
    personagens.forEach((personagem, id) => {
        const select = divFamilia.querySelector(`#p${id} select`)
        personagem.atividade = select.value
        const acao = select.value
        // console.log(acao)
        consumir(definicao[acao], id)
        // reduz um pouco a saúde mental com base no estado da casa
        personagem.estado.mental -= (100 - casa.estado) * config.efeitoBagunca
        // verifica a saúde chegou a 0
        if (Object.values(personagem.estado).some((estado) => estado <= 0)) {
            game.finalRuim = true
        }
    })
    // Aplica os efeitos sobre a casa
    casa = { ...recursosDescontados }
    // Desconta do estado da casa
    casa.estado -= config.velocidadeBagunca
    casa.estado = Math.min(Math.max(casa.estado, 0), 100)

    // Atualiza o contador de turnos
    game.turnos++

    atualizaTela()
    persistir()
}

function mostraGIF() {
    gif = document.getElementById("gif-carregando")

    gif.classList = ["ativa"]
    setTimeout(() => {
        gif.classList = ["desativa"]
        setTimeout(() => (gif.classList = []), 1000)
    }, 5500)
}

/* NAVEGAÇÃO */

function tela(tit, botao) {
    titulo.innerText = tit
    botaoPrincipal.innerText = botao

    document.getElementsByTagName("main")[0].classList = [game.state]
}

function changeState() {
    if (game.state == "alocacao") {
        // Verifica a ação selecionada de cada personagem por valores inválidos
        try {
            validarAcoes()
        } catch (mensagem) {
            alert(mensagem)
            return
        }
        mostraGIF()
        game.state = "status"
        // Espera a animação acontecer
        setTimeout(() => {
            avancarTurno()
            tela("Estado da Família", "Designar Tarefas")
            //Verifica se ele pode terminar o jogo
            if (game.turnos >= config.maxTurnos || game.finalRuim) {
                game.nomeFamilia = personagens[0].nome.split(" ")[1] // Todas as vezes a variavel sobrenome vem diferente do da família, portanto fiz esse gato.
                localStorage.setItem("gameState", JSON.stringify(game))
                loadPage("fim-jogo")
            }
        }, 1000)
    } else {
        //Continua o jogo
        game.state = "alocacao"
        tela("Alocação de Tarefas", "Concluir Ações")
    }
}
