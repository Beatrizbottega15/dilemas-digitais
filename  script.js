function mostrarDetalhes(dilema) {
  const detalhes = {
    exclusao: "Milhões de brasileiros dependem do acesso por franquias limitadas (pré-pago), restringindo o uso pleno da rede à poucas redes sociais.",
    desinformacao: "O Brasil figura entre os líderes em uso diário de redes sociais, tornando o ecossistema vulnerável à propagação em massa de conteúdos falsos.",
    saude: "Design persuasivo e mecânicas de recompensa contínua têm impulsionado quadros de ansiedade e sobrecarga de informação no público jovem."
  };

  alert(detalhes[dilema] || "Informação indisponível.");
}

function votar(opcao) {
  const display = document.getElementById("resultado-voto");
  display.textContent = `Voto registrado! Você priorizou o dilema: "${opcao}".`;
}