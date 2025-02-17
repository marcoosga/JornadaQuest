const startBtn = document.getElementById("start-btn");
const instructionsScreen = document.getElementById("instructions-screen");
const continueBtn = document.getElementById("continue-btn");
const questionScreen = document.getElementById("question-screen");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultScreen = document.getElementById("result-screen");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");
const feedbackText = document.getElementById("feedback");
const questionCounter = document.getElementById("question-counter");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "Juan trabaja en una fábrica en el área de producción, con una jornada laboral de 40 horas semanales establecida en su contrato. Sin embargo, en 2025 se ha aprobado una reducción de la jornada laboral a 37,5 horas. Además, Juan ha solicitado una adaptación de su jornada para poder cuidar de su padre, quien requiere atención constante y su empresa ha firmado un convenio colectivo que reduce la jornada laboral al departamento de logística. \n¿Cuáles son los factores que pueden modificar la duración de su jornada laboral?. ¿Además debería recibir una reducción de salario por alguno de ellos?.",
        options: ["Reducción a 37,5 horas y cuidado de un familiar. Sí debería reducir su salario.", "Convenios colectivos y acuerdos de empresa, reducción a 37,5 horas y cuidado de un familiar. No debería reducir su salario", "Reducción a 37,5 horas y cuidado de un familiar. No debería reducir su salario."],
        correct: 0
    },
    {
        question: "Explica la diferencia entre horas extraordinarias estructurales y no estructurales, y qué implicaciones tienen.",
        options: ["Las estructurales son necesarias para la producción, las no estructurales son voluntarias.", "Ambas son obligatorias.", "Las estructurales se pagan menos que las no estructurales."],
        correct: 0
    },
    {
        question: "Nos encontramos a día 3 de abril, Lunes, el sábado 1 David y María celebraron su boda por lo que les corresponden una serie de días libres por matrimonio, además coincidiendo con la boda se van a ir a vivir juntos, realizando la mudanza a la vuelta de la luna de miel. Al llegar al aeropuerto de Madrid a la vuelta de la luna de miel, María recibe la triste noticia del fallecimiento de su abuelo por lo que tendrá que desplazarse a Castilla y León y David deberá realizar la mudanza solo. ¿Qué dia volverá a trabajar María teniendo en cuenta que su jornada laboral es de lunes a viernes?",
        options: ["24 de abril" , "20 de abril", "25 de abril"],
        correct: 0
    },
    {
        question: "¿Qué mecanismos de flexibilidad horaria existen en la jornada laboral para las víctimas de violencia de género?",
        options: ["Adaptación o reducción de jornada con reducción salarial proporcional", "No existen mecanismos adicionales para las personas que sufren de violencia de género", "Adaptación o reducción de jornada sin pérdida de derechos"],
        correct: 0
    },
    {
        question: "Un trabajador ha sido padre recientemente, pero su bebé ha nacido de forma prematura y ha requerido hospitalización durante varias semanas. Dado este contexto, ¿qué derechos tiene el trabajador en términos de conciliación laboral y familiar?",
        options: ["Puede solicitar una ampliación del permiso de nacimiento por cada día de hospitalización del bebé, hasta un máximo de 13 semanas, y adaptar o reducir su jornada si lo necesita.", "Solo puede ausentarse de forma justificada durante un máximo de 5 días, sin derecho a reducción de jornada ni ampliación del permiso parental.", "Puede reducir su jornada hasta 2 horas y media con una reducción proporcional del salario."],
        correct: 0
    },
    {
        question: "Analiza el impacto de las jornadas laborales nocturnas y los turnos rotativos en la salud y productividad.",
        options: ["Afectan el sueño y pueden provocar problemas de salud", "No tienen impacto en la salud", "Mejoran la productividad y el bienestar"],
        correct: 0
    },
    {
        question: "¿Qué elementos debe incluir obligatoriamente un recibo de salario?",
        options: ["Salario base, complementos y deducciones", "Solo el salario neto", "No es obligatorio un desglose"],
        correct: 0
    },
    {
        question: "Explica los derechos de los trabajadores en caso de adopción, guarda con fines de adopción o acogimiento.",
        options: ["Tienen derecho a un permiso de 16 semanas", "Solo tienen 2 semanas de permiso", "No tienen derechos adicionales"],
        correct: 0
    },
    {
        question: "¿En qué circunstancias un trabajador puede solicitar una suspensión de contrato?",
        options: ["Por incapacidad temporal o mutuo acuerdo", "Solo si la empresa lo permite", "No puede suspenderse un contrato"],
        correct: 0
    },
    {
        question: "Describe las distintas causas de despido y los derechos del trabajador ante una rescisión de contrato por causas objetivas.",
        options: ["El trabajador tiene derecho a indemnización en despidos objetivos", "No tiene derecho a compensación", "Todos los despidos son improcedentes"],
        correct: 0
    },
    {
        question: "¿Qué es la movilidad funcional y cómo se diferencia de la movilidad geográfica?",
        options: ["Funcional es cambio de puesto dentro de la empresa, geográfica es cambio de ubicación", "Son lo mismo", "La movilidad funcional no existe en la ley"],
        correct: 0
    },
    {
        question: "¿Cuáles son los procedimientos y requisitos para solicitar una excedencia por cuidado de familiares?",
        options: ["Debe solicitarse con preaviso y tiene una duración máxima de 2 años", "Es obligatoria para la empresa", "No existe este tipo de excedencia"],
        correct: 0
    },
    {
        question: "En caso de conflicto laboral, ¿qué vías extrajudiciales existen para resolver disputas?",
        options: ["Mediación, conciliación y arbitraje", "Solo se resuelven en tribunales", "No hay mecanismos legales disponibles"],
        correct: 0
    },
    {
        question: "Explica las principales ayudas y recursos disponibles para trabajadores en situación de desempleo prolongado.",
        options: ["Prestaciones por desempleo, subsidios y programas de reinserción laboral", "Solo pueden buscar otro empleo", "No existen ayudas"],
        correct: 0
    }
];

// Mezclar respuestas aleatoriamente en cada pregunta
function shuffleAnswers(question) {
    let answers = [...question.options];
    let correctAnswer = answers[question.correct];

    for (let i = answers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    question.correct = answers.indexOf(correctAnswer);
    return answers;
}

startBtn.addEventListener("click", () => {
    document.getElementById("start-screen").classList.add("hidden");
    instructionsScreen.classList.remove("hidden");
});

continueBtn.addEventListener("click", () => {
    instructionsScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    showQuestion();
});

function showQuestion() {
    const q = questions[currentQuestionIndex];
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";
    feedbackText.textContent = "";
    feedbackText.className = ""; // 🔹 Elimina clases anteriores
    feedbackText.classList.remove("show"); // 🔹 Oculta el mensaje
    nextBtn.classList.add("hidden");
    questionCounter.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;

    let shuffledOptions = shuffleAnswers(q);

    shuffledOptions.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index, shuffledOptions, q.correct);
        optionsContainer.appendChild(btn);
    });
}


function selectAnswer(index, shuffledOptions, correctIndex) {
    // Primero, eliminar clases previas y mostrar feedback
    feedbackText.classList.remove("correct", "incorrect", "show");

    if (index === correctIndex) {
        score++;
        feedbackText.textContent = "✅ ¡Correcto! Bien hecho.";
        feedbackText.classList.add("correct");
    } else {
        feedbackText.textContent = "❌ Incorrecto.";
        feedbackText.classList.add("incorrect");
    }

    // Mostrar el mensaje con animación
    feedbackText.classList.add("show");
    nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    questionScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    scoreText.textContent = `Has obtenido ${score} de ${questions.length} puntos.`;
}

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultScreen.classList.add("hidden");
    questionScreen.classList.remove("hidden");
    showQuestion();
});
