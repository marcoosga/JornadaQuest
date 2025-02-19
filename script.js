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
        question: "Pedro trabaja en turnos rotativos, incluyendo el turno de noche. Sin embargo, ha solicitado permanecer en este último debido a razones personales. ¿En qué condiciones puede permanecer en el turno nocturno de manera permanente?",
        options: ["No puede permanecer en el turno de noche más de dos semanas seguidas, salvo si lo hace voluntariamente.", "Solo si su empresa se lo permite y si es mayor de 18 años, ya que los menores no pueden trabajar en turno nocturno.", "Solo puede quedarse en el turno de noche si su empresa lo autoriza y no supera el límite de 8 horas de media en 14 días."],
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
        question: "Un trabajador a tiempo parcial solicita hacer horas extraordinarias para incrementar su salario. ¿En qué circunstancias puede realizarlas?",
        options: ["No puede realizarlas en ningún caso, salvo por fuerza mayor.", "Puede hacerlas solo si están pactadas en su contrato o convenio, pero sin superar el límite anual de 80 horas extras.", "Puede hacerlas siempre que no superen las 8 horas diarias, compensándolas con descanso o remuneración adicional."],
        correct: 0
    },
    {
        question: "Valerio trabaja en jornada continuada y su empresa le ha informado sobre los descansos a los que tiene derecho. Sin embargo, ella duda sobre si estos descansos se consideran tiempo de trabajo efectivo. ¿Cuál de las siguientes afirmaciones es correcta?",
        options: ["Los descansos dentro de la jornada laboral se consideran tiempo de trabajo efectivo solo si el convenio lo establece.", "Siempre se consideran tiempo de trabajo efectivo, ya que forman parte de la jornada laboral.", "No se consideran tiempo de trabajo efectivo en ningún caso, independientemente de lo que establezca el convenio."],
        correct: 0
    },
    {
        question: " Imagina que tu empresa decide trasladarte a otra ciudad de manera definitiva. ¿Qué opciones tienes según la ley?",
        options: ["Aceptar el traslado con una compensación por los gastos (incluidos los de tu familia) o rechazarlo y recibir 20 días de salario por año trabajado como indemnización.", "Negarte sin más, ya que no pueden obligarte a cambiar de residencia.", "Aceptar el traslado, pero con derecho a volver a tu puesto original pasados seis meses"],
        correct: 0
    },
    {
        question: "Si la empresa cambia tus funciones dentro de tu mismo grupo profesional, ¿cuales son las consecuencias?",
        options: ["No hace falta justificar el cambio ni establecer un limite de tiempo, y tú no puedes rechazarlo", " Solo pueden hacerlo por un máximo de 6 meses en un año, salvo que el convenio diga lo contrario", "Tendrían que subirte el sueldo para compensar el cambio de funciones"],
        correct: 0
    },
    {
        question: "Tu empresa decide modificar tu jornada laboral sin tu consentimiento. ¿Qué NO puedes hacer en este caso?",
        options: ["Exigir que te mantengan las condiciones originales sin recurrir a la vía judicial o sindical", "Renunciar al trabajo con derecho a una indemnización de 33 días por año trabajado, si el cambio afecta negativamente a tu dignidad.", "Aceptar el cambio y continuar con tu trabajo como si nada."],
        correct: 0
    },
    {
        question: "Hay muchas situaciones en las que un contrato de trabajo se puede suspender. Pero, ¿en cuál de estas seguirías cobrando gracias a la Seguridad Social?",
        options: ["Si una mujer está embarazada y hay riesgo para tu salud o la del bebé, o si estás en periodo de lactancia.", "Si decides hacer huelga hasta que se resuelva el conflicto laboral", " Si te detienen sin sentencia condenatoria, pero luego te dejan en libertad."],
        correct: 0
    },
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
    questionText.innerHTML = `<h2>Pregunta ${currentQuestionIndex + 1}</h2> <p>${q.question}</p>`; 
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
