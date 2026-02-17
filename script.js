// Store questions in an array (Efficient & Scalable)
const quizData = [
    {
        question: "1. What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
    },
    {
        question: "2. Which language runs in the browser?",
        options: ["Java", "C++", "Python", "JavaScript"],
        correct: "JavaScript"
    },
    {
        question: "3. What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: "Cascading Style Sheets"
    },
    {
        question: "4. What does HTML stand for?",
        options: [
            "Hyperlinks and Text Markup Language",
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Tool Multi Language"
        ],
        correct: "Hyper Text Markup Language"
    },
    {
        question: "5. Which company developed JavaScript?",
        options: ["Microsoft", "Netscape", "Google", "Apple"],
        correct: "Netscape"
    }
];

const quizContainer = document.getElementById("quiz");
const resultBox = document.getElementById("result");

// Dynamically Load Questions
function loadQuiz() {
    quizContainer.innerHTML = "";

    quizData.forEach((data, index) => {
        const questionBox = document.createElement("div");
        questionBox.classList.add("question-box");

        let optionsHTML = "";
        data.options.forEach(option => {
            optionsHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${option}">
                    ${option}
                </label>
            `;
        });

        questionBox.innerHTML = `
            <h3>${data.question}</h3>
            <div class="options">
                ${optionsHTML}
            </div>
        `;

        quizContainer.appendChild(questionBox);
    });
}

// Check Individual Answer
function checkAnswer(selected, correct) {
    return selected === correct;
}

// Submit Quiz
function submitQuiz() {
    let score = 0;

    quizData.forEach((data, index) => {
        const selectedOption = document.querySelector(
            `input[name="question${index}"]:checked`
        );

        if (selectedOption && checkAnswer(selectedOption.value, data.correct)) {
            score++;
        }
    });

    displayResult(score);
}

// Display Result with Conditional Messages
function displayResult(score) {
    resultBox.style.display = "block";
    resultBox.classList.remove("success", "average", "poor");

    const total = quizData.length;
    const percentage = (score / total) * 100;

    if (percentage === 100) {
        resultBox.classList.add("success");
        resultBox.innerHTML = `🏆 Outstanding! You scored ${score}/${total} (${percentage}%)`;
    } else if (percentage >= 60) {
        resultBox.classList.add("average");
        resultBox.innerHTML = `👍 Good Job! You scored ${score}/${total} (${percentage}%)`;
    } else {
        resultBox.classList.add("poor");
        resultBox.innerHTML = `📚 Keep Practicing! You scored ${score}/${total} (${percentage}%)`;
    }
}

// Reset Quiz
function resetQuiz() {
    document.getElementById("quizForm").reset();
    resultBox.style.display = "none";
    resultBox.innerHTML = "";
}

// Event Listeners
document.getElementById("submitBtn").addEventListener("click", submitQuiz);
document.getElementById("resetBtn").addEventListener("click", resetQuiz);

// Load Quiz on Page Load
loadQuiz();