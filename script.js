
const questions = [
    {
        question: "1. What is the primary purpose of GitHub?",
        options: ["To write software code", "To track and manage changes to code", "To increase computer speed", "To create graphics"],
        answer: 1
    },

    {
        question: "2. What does the fork option in GitHub do?",
        options: ["Delete a Repository", "Creates a personal copy of someone else's repository", "Merges two repositorie", "Updates the repository automatically"],
        answer: 1
    },

    {
        question: "3. Which command is used to upload local changes to GitHub?",
        options: ["git push", "git pull", "git clone", "git status"],
        answer: 0
    },

    {
        question: "4.What is a commit in GitHub?",
        options: ["A branch in a repository", "A snapshot of changes made to the code", "A new repository", "A backup of the computer"],
        answer: 1
    },

    {
        question: "5.What is the use of a pull request in GitHub?",
        options: ["To Delete a Branch", "To request merging changes from one branch to another", "To pull changes from a local machine to GitHub", "To create a new repository"],
        answer: 1
    },

    {
        question: "6.Which of the following is a correct way to declare a variable in JavaScript?",
        options: ["var x = 5;", "int x = 5;", "let x; x = 5;", "Both a and c"],
        answer: 3
    },

    {
        question: "7.What will console.log(typeof null) output?",
        options: ["null", "undefined", "object", "number"],
        answer: 2
    },

    {
        question: "8.Which method is used to convert a JSON string into a JavaScript object?",
        options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.convert()"],
        answer: 1
    },

    {
        question: "9.What is the output of 2 + '2' in JavaScript?",
        options: ["4", "'22'", "NaN", "Error"],
        answer: 1
    },

    {
        question: "10.Which of the following is NOT a JavaScript data type?",
        options: ["String", "Number", "<Boolean>", "Character"],
        answer: 3
    }
];

let currentQ = 0;
let userAnswers = Array(questions.length).fill(null);

const quizBox = document.getElementById("quiz-box");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

// ✅ Function to load question
function loadQuestion() {
    const q = questions[currentQ];

    // Clear quiz box
    quizBox.innerHTML = "";

    // Add question
    const questionEl = document.createElement("h5");
    questionEl.textContent = q.question;
    quizBox.appendChild(questionEl);

    // Add options
    q.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.className = "form-check mt-2";

        const input = document.createElement("input");
        input.className = "form-check-input";
        input.type = "radio";
        input.name = "option";
        input.id = `opt${i}`;
        input.value = i;
        if (userAnswers[currentQ] === i) input.checked = true;

        const label = document.createElement("label");
        label.className = "form-check-label";
        label.setAttribute("for", `opt${i}`);
        label.textContent = opt;   // ✅ Safe text (tags dikhai denge)

        div.appendChild(input);
        div.appendChild(label);
        quizBox.appendChild(div);
    });

    // Buttons
    backBtn.disabled = currentQ === 0;
    nextBtn.classList.toggle("d-none", currentQ === questions.length - 1);
    submitBtn.classList.toggle("d-none", currentQ !== questions.length - 1);
}

// ✅ Save selected option
function saveAnswer() {
    const selected = document.querySelector("input[name='option']:checked");
    if (selected) {
        userAnswers[currentQ] = parseInt(selected.value);
    }
}

// ✅ Next button
nextBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQ < questions.length - 1) {
        currentQ++;
        loadQuestion();
    }
});

// ✅ Back button
backBtn.addEventListener("click", () => {
    saveAnswer();
    if (currentQ > 0) {
        currentQ--;
        loadQuestion();
    }
});

// ✅ Submit button
submitBtn.addEventListener("click", () => {
    saveAnswer();
    let score = 0;
    questions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) score++;
    });
    quizBox.innerHTML = "";
    backBtn.style.display = "none";
    nextBtn.style.display = "none";
    submitBtn.style.display = "none";
    result.innerHTML = `🎉 Your Score: ${score} / ${questions.length}`;
});

// ✅ First question load
loadQuestion();
