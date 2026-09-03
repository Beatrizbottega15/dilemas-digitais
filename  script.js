// ========================================
// DILEMAS DIGITAIS
// ========================================


// DADOS DOS DILEMAS

const dilemas = [

    {
        icon: "📱",

        title: "A mensagem suspeita",

        description:
            "Você recebe uma mensagem de um desconhecido dizendo que você ganhou um prêmio. Para receber, basta clicar em um link e informar alguns dados pessoais.",

        A:
            "Clicar no link e conferir o prêmio.",

        B:
            "Ignorar e apagar a mensagem.",

        correta: "B",

        feedback:
            "Boa escolha! Links desconhecidos podem levar a golpes ou páginas falsas."
    },


    {
        icon: "📸",

        title: "A foto do amigo",

        description:
            "Você tira uma foto engraçada de um amigo. A imagem ficou muito boa e seus seguidores provavelmente vão achar engraçado.",

        A:
            "Publicar sem perguntar, porque é só uma brincadeira.",

        B:
            "Perguntar antes de publicar.",

        correta: "B",

        feedback:
            "Respeitar a privacidade também vale no ambiente digital."
    },


    {
        icon: "📰",

        title: "A notícia bombástica",

        description:
            "Você encontra uma notícia extremamente chocante nas redes sociais. O título diz que algo enorme acabou de acontecer, mas você não conhece o site.",

        A:
            "Compartilhar imediatamente para avisar seus amigos.",

        B:
            "Verificar a fonte antes de compartilhar.",

        correta: "B",

        feedback:
            "Muito bem! Verificar a fonte ajuda a evitar a propagação de desinformação."
    },


    {
        icon: "🔐",

        title: "A senha compartilhada",

        description:
            "Seu melhor amigo pede sua senha de uma rede social para resolver uma coisa rapidinho. Ele diz que você pode confiar nele.",

        A:
            "Passar a senha, porque é seu amigo.",

        B:
            "Não compartilhar a senha.",

        correta: "B",

        feedback:
            "Senhas são pessoais. Mesmo pessoas próximas não devem ter acesso às suas contas."
    },


    {
        icon: "🤖",

        title: "A resposta da IA",

        description:
            "Você está fazendo um trabalho importante e encontra uma ferramenta de inteligência artificial que consegue produzir uma resposta completa em poucos segundos.",

        A:
            "Copiar tudo e entregar como se fosse meu.",

        B:
            "Usar a ferramenta como apoio e revisar o conteúdo.",

        correta: "B",

        feedback:
            "A IA pode ajudar muito, mas é importante verificar, compreender e assumir responsabilidade pelo conteúdo."
    }

];


// ========================================
// VARIÁVEIS
// ========================================

let perguntaAtual = 0;

let pontos = 0;

let respondeu = false;


// ========================================
// PEGAR ELEMENTOS DO HTML
// ========================================

const startBtn =
    document.getElementById("startBtn");

const choiceA =
    document.getElementById("choiceA");

const choiceB =
    document.getElementById("choiceB");

const restartBtn =
    document.getElementById("restartBtn");

const dilemaNumber =
    document.getElementById("dilemaNumber");

const dilemaIcon =
    document.getElementById("dilemaIcon");

const dilemaTitle =
    document.getElementById("dilemaTitle");

const dilemaDescription =
    document.getElementById("dilemaDescription");

const feedback =
    document.getElementById("feedback");

const progress =
    document.getElementById("progress");

const progressText =
    document.getElementById("progressText");

const progressPercent =
    document.getElementById("progressPercent");

const resultado =
    document.getElementById("resultado");

const score =
    document.getElementById("score");

const profileTitle =
    document.getElementById("profileTitle");

const profileDescription =
    document.getElementById("profileDescription");


// ========================================
// BOTÃO "ENTRAR NOS DILEMAS"
// ========================================

startBtn.addEventListener("click", function () {

    document
        .getElementById("dilemas")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// ========================================
// BOTÃO A
// ========================================

choiceA.addEventListener("click", function () {

    escolher("A");

});


// ========================================
// BOTÃO B
// ========================================

choiceB.addEventListener("click", function () {

    escolher("B");

});


// ========================================
// ESCOLHER RESPOSTA
// ========================================

function escolher(resposta) {

    // Impede clicar duas vezes
    if (respondeu === true) {
        return;
    }

    respondeu = true;


    const dilema =
        dilemas[perguntaAtual];


    // Verifica resposta

    if (resposta === dilema.correta) {

        pontos++;

    }


    // Muda visual dos botões

    if (resposta === "A") {

        choiceA.classList.add("selected");

    }

    if (resposta === "B") {

        choiceB.classList.add("selected");

    }


    // Resposta correta

    if (dilema.correta === "A") {

        choiceA.classList.add("correct");

    } else {

        choiceB.classList.add("correct");

    }


    // Se errou

    if (resposta !== dilema.correta) {

        if (resposta === "A") {

            choiceA.classList.add("wrong");

        } else {

            choiceB.classList.add("wrong");

        }

    }


    // Desabilita os botões

    choiceA.disabled = true;
    choiceB.disabled = true;


    // Mostra feedback

    feedback.textContent =
        dilema.feedback;

    feedback.classList.add("show");


    // Próximo dilema

    setTimeout(function () {

        perguntaAtual++;


        if (perguntaAtual < dilemas.length) {

            carregarDilema();

        } else {

            mostrarResultado();

        }

    }, 2500);

}


// ========================================
// CARREGAR DILEMA
// ========================================

function carregarDilema() {

    const dilema =
        dilemas[perguntaAtual];


    dilemaNumber.textContent =
        "DILEMA #" +
        String(perguntaAtual + 1).padStart(2, "0");


    dilemaIcon.textContent =
        dilema.icon;


    dilemaTitle.textContent =
        dilema.title;


    dilemaDescription.textContent =
        dilema.description;


    choiceA.innerHTML =
        "<span>A</span>" +
        dilema.A;


    choiceB.innerHTML =
        "<span>B</span>" +
        dilema.B;


    // Resetar botões

    choiceA.disabled = false;
    choiceB.disabled = false;

    choiceA.className = "choice";
    choiceB.className = "choice";


    // Resetar feedback

    feedback.textContent = "";

    feedback.classList.remove("show");


    respondeu = false;


    // Atualizar progresso

    const porcentagem =
        ((perguntaAtual + 1) / dilemas.length) * 100;


    progress.style.width =
        porcentagem + "%";


    progressText.textContent =
        "Dilema " +
        (perguntaAtual + 1) +
        " de " +
        dilemas.length;


    progressPercent.textContent =
        Math.round(porcentagem) + "%";

}


// ========================================
// MOSTRAR RESULTADO
// ========================================

function mostrarResultado() {

    score.textContent =
        pontos;


    if (pontos === 5) {

        profileTitle.textContent =
            "Guardião Digital 🛡️";

        profileDescription.textContent =
            "Incrível! Você demonstrou muita responsabilidade e consciência nas suas escolhas digitais.";

    }

    else if (pontos >= 3) {

        profileTitle.textContent =
            "Pensador Digital 🧠";

        profileDescription.textContent =
            "Muito bem! Você está atento aos principais riscos digitais e pensa antes de agir.";

    }

    else {

        profileTitle.textContent =
            "Explorador Digital 🚀";

        profileDescription.textContent =
            "A internet oferece muitas possibilidades, mas também exige atenção. Pense um pouco mais antes do próximo clique!";

    }


    resultado.classList.add("show");


    resultado.scrollIntoView({
        behavior: "smooth"
    });

}


// ========================================
// REINICIAR
// ========================================

restartBtn.addEventListener("click", function () {

    perguntaAtual = 0;

    pontos = 0;

    respondeu = false;


    resultado.classList.remove("show");


    carregarDilema();


    document
        .getElementById("dilemas")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// ========================================
// INICIALIZAR
// ========================================

carregarDilema();