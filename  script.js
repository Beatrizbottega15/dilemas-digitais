/* ==========================================
   1. CANVAS DE BACKGROUND INTERATIVO (REDE/ESTRELAS)
   ========================================== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 60;

function setCanvasDimensions() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setCanvasDimensions();
window.addEventListener('resize', setCanvasDimensions);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = (Math.random() - 0.5) * 0.8;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = 'rgba(0, 243, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}
initParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    // Conectar partículas próximas com linhas neon
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 243, 255, ${1 - distance / 120})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ==========================================
   2. CURSOR PERSONALIZADO & CONTADOR AO VIVO
   ========================================== */
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Efeito de clique no cursor
document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
  cursor.style.borderColor = '#ff0055';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  cursor.style.borderColor = '#00f3ff';
});

// Oscilação dinâmica do número de usuários online
setInterval(() => {
  const countElement = document.getElementById('connected-count');
  let currentCount = parseInt(countElement.textContent.replace('.', ''));
  const change = Math.floor(Math.random() * 11) - 5; // -5 a +5
  currentCount += change;
  countElement.textContent = currentCount.toLocaleString('pt-BR');
}, 3000);

/* ==========================================
   3. MINIGAME: DETECTIVE DE FAKE NEWS
   ========================================== */
const newsDatabase = [
  {
    source: "WhatsApp - Mensagem encaminhada muitas vezes",
    text: '"URGENTE: Nova tecnologia de antenas 5G altera o clima no interior do Nordeste!"',
    isFake: true,
    explicacao: "FAKENEWS: Ondas eletromagnéticas do 5G não influenciam fenômenos meteorológicos ou o clima."
  },
  {
    source: "Portal da Transparência / IBGE",
    text: '"Mais de 20% dos lares brasileiros dependem exclusivamente do celular para acessar a internet."',
    isFake: false,
    explicacao: "VERDADEIRO: Dados de pesquisas domiciliares mostram forte dependência de conexões móveis na baixa renda."
  },
  {
    source: "Grupo do Telegram - Canal 'Notícias Secretas'",
    text: '"Algoritmo secreto das redes sociais desliga seu Wi-Fi se você criticar uma autoridade."',
    isFake: true,
    explicacao: "FAKENEWS: Redes sociais não possuem controle sobre o hardware de Wi-Fi dos aparelhos móveis."
  },
  {
    source: "Estudo Acadêmico / FIOCRUZ",
    text: '"O uso descontrolado de telas antes de dormir afeta a produção de melatonina em jovens e adultos."',
    isFake: false,
    explicacao: "VERDADEIRO: A luz azul emitida por telas inibe o hormônio responsável pelo sono profundo."
  }
];

let currentNewsIndex = 0;
let score = 0;
let totalPlayed = 0;

function carregarNoticia() {
  const current = newsDatabase[currentNewsIndex];
  document.getElementById('news-source').textContent = current.source;
  document.getElementById('news-content').textContent = current.text;
  document.getElementById('game-feedback').textContent = '';
  document.getElementById('game-feedback').style.color = '#fff';
}

function verificarNoticia(respostaUsuario) {
  const current = newsDatabase[currentNewsIndex];
  const feedback = document.getElementById('game-feedback');
  
  totalPlayed++;

  if (respostaUsuario === current.isFake) {
    score++;
    feedback.textContent = `✅ Correto! ${current.explicacao}`;
    feedback.style.color = 'var(--green-neon)';
  } else {
    feedback.textContent = `❌ Errado! ${current.explicacao}`;
    feedback.style.color = 'var(--magenta-neon)';
  }

  document.getElementById('score').textContent = score;
  document.getElementById('total-played').textContent = totalPlayed;

  // Próxima notícia após delay
  setTimeout(() => {
    currentNewsIndex = (currentNewsIndex + 1) % newsDatabase.length;
    carregarNoticia();
  }, 3500);
}

// Inicializar primeira notícia
carregarNoticia();

/* ==========================================
   4. SIMULADOR DE EXCLUSÃO DIGITAL
   ========================================== */
function atualizarSimuladorRenda(val) {
  const label = document.getElementById('income-label');
  const previewBody = document.getElementById('preview-body');
  const banner = document.getElementById('blocked-banner');

  if (val == "1") {
    label.textContent = "Renda: Até 0,5 Salário Mínimo (Franquia Esgotada - Sem Acesso à Web)";
    label.style.color = "var(--magenta-neon)";
    banner.style.display = "block";
    previewBody.style.opacity = "0.3";
  } else if (val == "2") {
    label.textContent = "Renda: 1 Salário Mínimo (Zero-Rating: Apenas Redes Sociais Liberadas)";
    label.style.color = "var(--yellow-neon)";
    banner.style.display = "block";
    previewBody.style.opacity = "0.6";
  } else {
    label.textContent = "Renda: Acima de 3 Salários Mínimos (Acesso Ilimitado Fibra/5G)";
    label.style.color = "var(--green-neon)";
    banner.style.display = "none";
    previewBody.style.opacity = "1";
  }
}

function alternarModoZeroData() {
  document.body.classList.toggle('zero-data-mode');
  const btn = document.getElementById('btn-zero-text');
  
  if (document.body.classList.contains('zero-data-mode')) {
    btn.textContent = "RESTAURAR A CONEXÃO TOTAL";
  } else {
    btn.textContent = 'SIMULAR "ZERO DATA" (PRE-PAGO)';
  }
}

/* ==========================================
   5. CALCULADORA DE IMPULSO ALGORÍTMICO
   ========================================== */
function calcularImpacto() {
  const time = parseInt(document.getElementById('screen-time').value);
  const habit = document.getElementById('user-habit').value;
  
  let scoreBase = time * 12;

  if (habit === 'med') scoreBase += 20;
  if (habit === 'high') scoreBase += 40;

  if (scoreBase > 100) scoreBase = 100;

  const meterFill = document.getElementById('meter-fill');
  const meterText = document.getElementById('meter-text');

  meterFill.style.width = scoreBase + '%';

  if (scoreBase < 35) {
    meterText.textContent = `${scoreBase}% - Exposição Baixa: Uso consciente da rede.`;
    meterText.style.color = 'var(--green-neon)';
  } else if (scoreBase < 70) {
    meterText.textContent = `${scoreBase}% - Exposição Moderada: Risco de fadiga informacional.`;
    meterText.style.color = 'var(--yellow-neon)';
  } else {
    meterText.textContent = `${scoreBase}% - Exposição Crítica: Alto risco de retenção e ansiedade.`;
    meterText.style.color = 'var(--magenta-neon)';
  }
}
