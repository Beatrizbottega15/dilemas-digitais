const dilemas = [
    {
        icon: "📱",
        title: "A mensagem suspeita",
        description:
            "Você recebe uma mensagem de um desconhecido dizendo que você ganhou um prêmio. Para receber, basta clicar em um link e informar alguns dados pessoais.",
        choices: [
            "Clicar no link e conferir o prêmio.",
            "Ignorar e apagar a mensagem."
        ],
        correct: 1,
        feedback:
            "Boa escolha! Links desconhecidos podem levar a golpes ou páginas falsas."
    },

    {
        icon: "📸",
        title: "A foto do amigo",
        description:
            "Você tira uma foto engraçada de um amigo. A imagem ficou muito boa e seus seguidores provavelmente vão achar engraçado. Você decide...",
        choices: [
            "Publicar sem perguntar, porque é só uma brincadeira.",
            "Perguntar antes de publicar."
        ],
        correct: 1,
        feedback:
            "Respeitar a privacidade também vale no ambiente digital."
    },

    {
        icon: "📰",
        title: "A notícia bombástica",
        description:
            "Você encontra uma notícia extremamente chocante nas redes sociais. O título diz que algo enorme acabou de acontecer, mas você não conhece o site.",
        choices: [
            "Compartilhar imediatamente para avisar seus amigos.",
            "Verificar a fonte antes de compartilhar."
        ],
        correct: 1,
        feedback:
            "Boa! Verificar a fonte antes de compartilhar ajuda a combater a desinformação."
    },

    {
        icon: "🔐",
        title: "A senha compartilhada",
        description:
            "Seu melhor amigo pede sua senha de uma rede social para 'resolver uma coisa rapidinho'. Ele diz que você pode confiar nele.",
        choices: [
            "Passar a senha, porque é seu amigo.",
            "Não compartilhar a senha."
        ],
        correct: 1,
        feedback:
            "Senhas são pessoais. Mesmo pessoas próximas não devem ter acesso às suas contas."
    },

    {
        icon: "🤖",
        title: "A resposta da IA",
        description:
            "Você está fazendo um trabalho importante e encontra uma ferramenta de inteligência artificial que consegue produzir uma resposta completa em poucos segundos.",
        choices: [
            "Copiar tudo e entregar como se fosse meu.",
            "Usar a ferramenta como apoio e revisar o conteúdo."
        ],
        correct: 1,
        feedback:
            "A IA pode ajudar muito, mas é importante verificar, compreender e assumir responsabilidade pelo conteúdo."
    }
];

let atual = 0;
let pontos = 0;
let respondido = false;


// ===============================
// INICIAR
// ===============================

function iniciarDilemas() {

    document.getElementById("dilemas").scrollIntoView({
        behavior: "smooth"
    });

}


// ===============================
// CARREGAR DILEMA
// ===============================

function carregarDilema() {

    const dilema = dilemas[atual];

    const numero = document.getElementById("dilemaNumber");
    const icone = document.getElementById("dilemaIcon");
    const titulo = document.getElementById("dilemaTitle");
    const descricao = document.getElementById("dilemaDescription");
    const choices = document.getElementById("choices");
    const feedback = document.getElementById("feedback");

    numero.textContent =
        `DILEMA #${String(atual + 1).padStart(2, "0")}`;

    icone.textContent = dilema.icon;

    titulo.textContent = dilema.title;

    descricao.textContent = dilema.description;

    feedback.classList.remove("show");
    feedback.textContent = "";

    choices.innerHTML = "";

    respondido = false;


    // Criar os dois botões
    dilema.choices.forEach((texto, index) => {

        const botao = document.createElement("button");

        botao.className = "choice";

        botao.type = "button";

        botao.innerHTML = `
            <span>${index === 0 ? "A" : "B"}</span>
            ${texto}
        `;


        // Evento de clique
        botao.addEventListener("click", function () {

            escolher(index);

        });


        choices.appendChild(botao);

    });


    atualizarProgresso();


    // Animação
    const card = document.getElementById("dilemaCard");

    card.classList.remove("fade");

    void card.offsetWidth;

    card.classList.add("fade");
}


// ===============================
// PROGRESSO
// ===============================

function atualizarProgresso() {

    const total = dilemas.length;

    const percentual =
        ((atual + 1) / total) * 100;


    document.getElementById("progress").style.width =
        percentual + "%";


    document.getElementById("progressText").textContent =
        `Dilema ${atual + 1} de ${total}`;


    document.getElementById("progressPercent").textContent =
        `${Math.round(percentual)}%`;
}


// ===============================
// ESCOLHER RESPOSTA
// ===============================

function escolher(opcao) {

    // Impede dois cliques
    if (respondido) {
        return;
    }

    respondido = true;

    const dilema = dilemas[atual];

    const botoes =
        document.querySelectorAll(".choice");


    // Desabilita os botões
    botoes.forEach((botao, index) => {

        botao.disabled = true;

        if (index === dilema.correct) {

            botao.style.borderColor = "#70ffb0";
            botao.style.background =
                "rgba(112,255,176,0.08)";

        }

        if (index === opcao && opcao !== dilema.correct) {

            botao.style.borderColor = "#ff5c7a";
            botao.style.background =
                "rgba(255,92,122,0.08)";

        }

    });


    // Pontuação
    if (opcao === dilema.correct) {

        pontos++;

    }


    // Mostrar explicação
    const feedback =
        document.getElementById("feedback");

    feedback.textContent =
        dilema.feedback;

    feedback.classList.add("show");


    // Próxima pergunta
    setTimeout(() => {

        atual++;


        if (atual < dilemas.length) {

            carregarDilema();

        } else {

            mostrarResultado();

        }

    }, 2500);

}


// ===============================
// RESULTADO
// ===============================

function mostrarResultado() {

    const resultado =
        document.getElementById("resultado");


    resultado.classList.add("show");


    document.getElementById("score").textContent =
        pontos;


    let titulo;
    let descricao;


    if (pontos === 5) {

        titulo = "Guardião Digital 🛡️";

        descricao =
            "Incrível! Você demonstrou muita responsabilidade, segurança e consciência nas suas escolhas digitais.";

    }

    else if (pontos >= 3) {

        titulo = "Pensador Digital 🧠";

        descricao =
            "Muito bem! Você está atento aos principais riscos digitais, mas ainda pode melhorar algumas escolhas.";

    }

    else {

        titulo = "Explorador Digital 🚀";

        descricao =
            "A internet oferece muitas possibilidades, mas também exige atenção. Pense um pouco mais antes do próximo clique!";

    }


    document.getElementById("profileTitle").textContent =
        titulo;


    document.getElementById("profileDescription").textContent =
        descricao;


    resultado.scrollIntoView({
        behavior: "smooth"
    });

}


// ===============================
// REINICIAR
// ===============================

function reiniciar() {

    atual = 0;

    pontos = 0;

    respondido = false;


    document.getElementById("resultado")
        .classList.remove("show");


    carregarDilema();


    setTimeout(() => {

        document.getElementById("dilemas")
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 100);

}


// ===============================
// INICIAR SITE
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    carregarDilema();

});