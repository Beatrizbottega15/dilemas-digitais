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
            "Boa escolha! Links desconhecidos podem levar a golpes ou páginas falsas. Antes de fornecer dados, é importante verificar a origem da mensagem."
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
            "Respeitar a privacidade também vale no ambiente digital. Uma foto que parece engraçada para você pode deixar outra pessoa desconfortável."
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
            "Mandou bem! Verificar a fonte, a data e outras referências ajuda a evitar a propagação de desinformação."
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
            "Senhas são pessoais. Mesmo pessoas próximas não precisam ter acesso às suas contas. Uma senha forte e exclusiva aumenta sua segurança."
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
            "A IA pode ser uma ótima ferramenta de apoio, mas é importante compreender, verificar e assumir responsabilidade pelo que você apresenta."
    }
];

let atual = 0;
let pontos = 0;

function iniciarDilemas() {
    document.getElementById("dilemas").scrollIntoView({
        behavior: "smooth"
    });
}

function carregarDilema() {

    const dilema = dilemas[atual];

    document.getElementById("dilemaNumber").textContent =
        `DILEMA #${String(atual + 1).padStart(2, "0")}`;

    document.getElementById("dilemaIcon").textContent =
        dilema.icon;

    document.getElementById("dilemaTitle").textContent =
        dilema.title;

    document.getElementById("dilemaDescription").textContent =
        dilema.description;

    const choices = document.getElementById("choices");

    choices.innerHTML = "";

    dilema.choices.forEach((choice, index) => {

        const button = document.createElement("button");

        button.className = "choice";

        button.innerHTML = `
            <span>${index === 0 ? "A" : "B"}</span>
            ${choice}
        `;

        button.onclick = () => escolher(index);

        choices.appendChild(button);
    });

    document.getElementById("feedback").classList.remove("show");
    document.getElementById("feedback").textContent = "";

    atualizarProgresso();

    const card = document.getElementById("dilemaCard");

    card.classList.remove("fade");

    void card.offsetWidth;

    card.classList.add("fade");
}

function atualizarProgresso() {

    const total = dilemas.length;

    const percentual =
        ((atual + 1) / total) * 100;

    document.getElementById("progress").style.width =
        percentual + "%";

    document.getElementById("progressText").textContent =
        `Dilema ${atual + 1} de ${total}`;

    document.getElementById("progressPercent").textContent =
        `${percentual}%`;
}

function escolher(opcao) {

    const dilema = dilemas[atual];

    const botoes =
        document.querySelectorAll(".choice");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (opcao === dilema.correct) {
        pontos++;
    }

    const feedback =
        document.getElementById("feedback");

    feedback.textContent = dilema.feedback;

    feedback.classList.add("show");

    setTimeout(() => {

        atual++;

        if (atual < dilemas.length) {

            carregarDilema();

        } else {

            mostrarResultado();

        }

    }, 2200);
}

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
            "Você demonstra bastante consciência digital. Antes de clicar, compartilhar ou publicar, você pensa nas consequências.";

    } else if (pontos >= 3) {

        titulo = "Pensador Digital 🧠";

        descricao =
            "Você está no caminho certo! Algumas decisões ainda podem melhorar, mas você já demonstra preocupação com segurança e responsabilidade.";

    } else {

        titulo = "Explorador Digital 🚀";

        descricao =
            "A internet é cheia de possibilidades, mas também exige atenção. Que tal pensar um pouco mais antes do próximo clique?";
    }

    document.getElementById("profileTitle").textContent =
        titulo;

    document.getElementById("profileDescription").textContent =
        descricao;

    resultado.scrollIntoView({
        behavior: "smooth"
    });
}

function reiniciar() {

    atual = 0;
    pontos = 0;

    document.getElementById("resultado")
        .classList.remove("show");

    carregarDilema();

    document.getElementById("dilemas")
        .scrollIntoView({
            behavior: "smooth"
        });
}

carregarDilema();