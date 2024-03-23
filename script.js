const questions = [
    
    {
        question: "Qual é a ferramenta mais comumente utilizada para otimização de processos na Engenharia de Produção?",
        options: {
            A: "Diagrama de Ishikawa",
            B: "Gráfico de Pareto",
            C: "Lean Manufacturing",
            D: "Método PDCA"
        },
        correctAnswer: "D"
    },
    {
        question: "Qual é o principal objetivo da Engenharia de Produção?",
        options: {
            A: "Desenvolver novos materiais",
            B: "Otimizar processos produtivos",
            C: "Projetar estruturas de construção",
            D: "Estudar fenômenos climáticos"
        },
        correctAnswer: "B"
    },
    {
        question: "O que é um Diagrama de Gantt e como ele é utilizado na Engenharia de Produção??",
        options: {
            A: "Uma ferramenta para análise de custos",
            B: "Um método de alocação de recursos humanos",
            C: "Um gráfico de barras usado para planejamento e acompanhamento de projetos",
            D: "Um modelo matemático para otimização de processos"
        },
        correctAnswer: "C"
    },
    {
        question: "O que é o conceito de Just in Time (JIT) na Engenharia de Produção?",
        options: {
            A: " Um método de controle de qualidade",
            B: " Um sistema de gestão de recursos humanos",
            C: "Uma filosofia de produção enxuta",
            D: "Uma abordagem de design de produtos"
        },
        correctAnswer: "C"
    },
    {
        question: "Qual a derivada de g(x) = (2x³+5x)² em relação a x ?",
        options: {
            A: "12x²+20",
            B: "4x(2x³+5x)",
            C: "4(2x³+5x)",
            D: "6x²(2x³+5x)"
        },
        correctAnswer: "B"
    }
];
//contador
let currentQuestion = 0;
let score = 0;
let countdown; // Variável para o temporizador

//função de inicialização do quiz
function startQuiz() {
    document.getElementById('intro-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    shuffleQuestions(); // Embaralha as perguntas para tornar o quiz mais dinâmico
    showQuestion(); // Exibe a primeira pergunta
    startTimer();  // Inicia o temporizador
}
//randomizador de perguntas
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// Função para exibir a pergunta atual
function showQuestion() {
    const current = questions[currentQuestion];
    document.getElementById("question").textContent = current.question;
    document.getElementById("labelA").textContent = current.options.A;
    document.getElementById("labelB").textContent = current.options.B;
    document.getElementById("labelC").textContent = current.options.C;
    document.getElementById("labelD").textContent = current.options.D;
}
// Função para iniciar o temporizador
function startTimer() {
    let time = 120;
    countdown = setInterval(function () {
        document.getElementById("countdown").textContent = time + "s";

        if (time <= 0) {
            clearInterval(countdown);
            checkAnswer();
        }
        time--;

        if (time < 0) {
            time = 0; // Evita que o temporizador exiba valores negativos.
        }
    }, 1000);
}
// Função para verificar a resposta selecionada
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (!selectedOption) {
        alert("Por favor, selecione uma opção.");
        return;
    }
// Verifica se a resposta selecionada está correta e atualiza a pontuação
    if (selectedOption.value === questions[currentQuestion].correctAnswer) {
        score++;
    }
// Move para a próxima pergunta ou termina o quiz
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
 // Limpa a seleção da opção
    selectedOption.checked = false;
}
// Função para encerrar o quiz
function endQuiz() {
    clearInterval(countdown);

    const percentualAcerto = (score / questions.length) * 100;

// Determina a mensagem com base no percentual de acerto
    let mensagem = "";
    if (percentualAcerto <= 10) {
        mensagem = "Rapaz, tá ruim hein!";
    } else if (percentualAcerto <= 30) {
        mensagem = "Celso vai reclamar!";
    } else if (percentualAcerto <= 60) {
        mensagem = "Bamos disser!";
    } else if (percentualAcerto <= 90) {
        mensagem = "Você é coreano?";
    } else {
        mensagem = "VOCÊ É GEOVANA??";
    }
// Exibe o resultado do quiz
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = `
        <h2>Resultado do Quiz</h2>
        <p>Corretas: ${score}</p>
        <p>Incorretas: ${questions.length - score}</p>
        <p>Percentual de acerto: ${percentualAcerto.toFixed(2)}%</p>
        <p>${mensagem}</p>
        <button onclick="restartQuiz()">Reiniciar Quiz</button>
    `;
}
// Função para reiniciar o quiz
function restartQuiz() {
    clearInterval(countdown);

    currentQuestion = 0;
    score = 0;
    shuffleQuestions();
    showQuestion();
    
    // Reiniciar temporizador
    startTimer();
    
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = "";
}

window.onload = function () {
    document.getElementById("start-button").addEventListener("click", startQuiz);
};
