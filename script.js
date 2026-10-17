// PERSONALIZA AQUI: coloca a data em que a vossa relação começou.
// Formato: "AAAA-MM-DDT00:00:00". Exemplo: "2026-05-23T00:00:00"
const relationshipStart = "2026-04-27T16:50:00"; // Ex.: "2026-05-23T00:00:00"

const $ = (selector) => document.querySelector(selector);

// Entrada da surpresa
$("#openSurprise").addEventListener("click", () => {
  $("#mensagem").scrollIntoView({ behavior: "smooth" });
  burstHearts();
});

// Contador do tempo juntos
function updateCounter() {
  const note = $("#counterNote");
  if (!relationshipStart) {
    note.textContent = "Para ativar o contador, coloca a vossa data no início do ficheiro script.js.";
    ["#days", "#hours", "#minutes", "#seconds"].forEach(id => $(id).textContent = "—");
    return;
  }
  const start = new Date(relationshipStart);
  if (Number.isNaN(start.getTime()) || start > new Date()) {
    note.textContent = "Verifica se a data no script.js está correcta e não é uma data futura.";
    return;
  }
  note.textContent = "E a contagem continua... ❤️";
  const totalSeconds = Math.floor((Date.now() - start.getTime()) / 1000);
  $("#days").textContent = Math.floor(totalSeconds / 86400).toLocaleString("pt-PT");
  $("#hours").textContent = Math.floor((totalSeconds % 86400) / 3600);
  $("#minutes").textContent = Math.floor((totalSeconds % 3600) / 60);
  $("#seconds").textContent = totalSeconds % 60;
}
updateCounter();
setInterval(updateCounter, 1000);


// Se as fotografias existirem na pasta assets, mostra-as nos cartões de memórias.
document.querySelectorAll("[data-memory]").forEach(card => {
  const image = new Image();
  image.src = `assets/${card.dataset.memory}`;
  image.onload = () => {
    card.style.backgroundImage = `linear-gradient(to top, rgba(18,9,15,.92), rgba(18,9,15,.04) 70%), url("${image.src}")`;
    card.style.backgroundPosition = "center";
    card.style.backgroundSize = "cover";
    card.querySelector(".photo-placeholder").classList.add("hidden");
  };
});

// Cartas: edita estes textos para ficarem ainda mais pessoais.
const letters = {
  saudades: {
    title: "Quando tiveres saudades minhas",
    text: [
      "My Wife, if you're reading this, maybe right now you wish I were there with you.",
      "Close your eyes for a moment and imagine one of my hugs, the kind where nothing needs to be said. Even when we're not side by side, I want you to know how important you are to me.",
      "Even on the days when the distance feels heavy, there's still a love that keeps bringing us closer. Save this hug until I can give you one in person. ❤️"
    ]
  },
  triste: {
    title: "Quando estiveres triste",
    text: [
      "My love, you don't have to pretend that everything is okay with me. You can have difficult days, you can feel tired, and you can take all the time you need.",
      "I may not be able to solve everything for you, but I want to listen to you, respect your feelings, and be by your side in whatever way you need.",
      "Take a deep breath, show yourself a little love, and remember: one difficult day doesn't make you any less amazing. I'm always rooting for you. ♡"
    ]
  },
  sorrir: {
    title: "Quando precisares de sorrir",
    text: [
     "Hey, my Wife! This is your official reminder that your smile deserves to be seen more often. 😌",
     "If you're having a difficult day, I hope these words can at least steal a little smile from you. And if they don't work, I'll have to try in person with my silly jokes.",
     "Today's mission: smile a little. Yes, I'm imagining that beautiful smile of yours right now. ♥"
    ]
  }
};

const dialog = $("#letterDialog");
document.querySelectorAll("[data-letter]").forEach(button => {
  button.addEventListener("click", () => {
    const letter = letters[button.dataset.letter];
    $("#dialogTitle").textContent = letter.title;
    $("#dialogText").replaceChildren(...letter.text.map(paragraph => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      return p;
    }));
    dialog.showModal();
  });
});
$("#closeDialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

// Jogo romântico: personaliza as perguntas e as respostas.
const quiz = [
  {
    question: "O que eu mais quero ver no teu rosto?",
    options: ["O teu sorriso", "Uma cara séria", "Uma expressão de sono"],
    correct: 0,
    feedback: "Acertaste! O teu sorriso é uma das minhas coisas favoritas. ❤️"
  },
  {
    question: "O que torna um momento nosso especial?",
    options: ["Só os presentes", "Estarmos juntos e sermos nós", "O lugar ser caro"],
    correct: 1,
    feedback: "Exactamente. O que importa é viver o momento contigo. ♡"
  },
  {
    question: "Quando é que mereces carinho?",
    options: ["Só nos dias bons", "Só em ocasiões especiais", "Todos os dias"],
    correct: 2,
    feedback: "A resposta certa: todos os dias, sem precisares de uma razão. ♥"
  }
];
let quizIndex = 0;
function renderQuiz() {
  const item = quiz[quizIndex];
  $("#quizNumber").textContent = `PERGUNTA ${quizIndex + 1} DE ${quiz.length}`;
  $("#quizQuestion").textContent = item.question;
  $("#quizFeedback").textContent = "";
  $("#nextQuestion").classList.add("hidden");
  const options = $("#quizOptions");
  options.replaceChildren(...item.options.map((label, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", () => {
      [...options.querySelectorAll("button")].forEach(b => b.disabled = true);
      button.classList.add("chosen");
      $("#quizFeedback").textContent = index === item.correct
        ? item.feedback
        : "Resposta aceite! O mais importante é que este jogo te faça sorrir. A minha mensagem continua a mesma: és especial. ♥";
      $("#nextQuestion").textContent = quizIndex === quiz.length - 1 ? "Jogar outra vez ↻" : "Próxima pergunta →";
      $("#nextQuestion").classList.remove("hidden");
    });
    return button;
  }));
}
renderQuiz();
$("#nextQuestion").addEventListener("click", () => {
  quizIndex = (quizIndex + 1) % quiz.length;
  renderQuiz();
});

// Declaração final
$("#revealFinal").addEventListener("click", () => {
  $("#finalLetter").classList.remove("hidden");
  $("#finalLetter").scrollIntoView({ behavior: "smooth", block: "center" });
  burstHearts();
});

// Música de fundo: os navegadores exigem uma acção da pessoa para começar áudio.
const music = $("#backgroundMusic");
$("#musicToggle").addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      $("#musicLabel").textContent = "Pausar música";
      $("#musicIcon").textContent = "♫";
      $("#musicToggle").setAttribute("aria-pressed", "true");
    } catch {
      $("#musicLabel").textContent = "Adiciona assets/music.mp3";
    }
  } else {
    music.pause();
    $("#musicLabel").textContent = "Ligar música";
    $("#musicToggle").setAttribute("aria-pressed", "false");
  }
});

// Corações flutuantes e pequenos corações ao abrir surpresas.
function createHeart() {
  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 22}px`;
  heart.style.animationDuration = `${7 + Math.random() * 7}s`;
  $("#floatingHearts").appendChild(heart);
  setTimeout(() => heart.remove(), 15000);
}
setInterval(createHeart, 1100);
function burstHearts() {
  for (let i = 0; i < 14; i++) setTimeout(createHeart, i * 90);
}

// Animação suave das secções quando aparecem no ecrã.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(section => observer.observe(section));

// Voltar ao início
$("#backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
