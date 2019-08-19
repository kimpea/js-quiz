(function () {
    function buildQuiz() {
        // Place to store html output
        const output = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {
                // store list of answer choices
                const answers = [];
                // for each answer...
                for (letter in currentQuestion.answers) {
                    // add html radio button...
                    answers.push(
                        `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                    );
                }

                // add this question and its answers to output
                output.push(
                    `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
                );
            }
        );
        // combine output list into one string of html and put on page
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // colour the answers green
                answerContainers[questionNumber].getElementsByClassName.color = 'lightgreen';
            } else {
                // colour answers red
                answerContainers[questionNumber].getElementsByClassName.color = 'red';
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

    const myQuestions = [
        {
            question: "What are the two factions in the game?",
            answers: {
                a: "Triumverate and Alliance",
                b: "Alliance and Horde",
                c: "Light and Dark"
            },
            correctAnswer: "b"
        },
        {
            question: "Can you kill other players' characters in this game?",
            answers: {
                a: "Yes",
                b: "No",
                c: "Yes but only when PvP mode is activated"
            },
            correctAnswer: "c"
        },
        {
            question: "What classes get a free mount (excluding the expansions)?",
            answers: {
                a: "Priest and Mage",
                b: "Paladin and Warlock",
                c: "Hunter and Druid"
            },
            correctAnswer: "b"
        },
        {
            question: "Cannibalise is a racial trait for which race?",
            answers: {
                a: "Undead",
                b: "Human",
                c: "Orc"
            },
            correctAnswer: "a"
        },
        {
            question: "What class has to go out and physically find their pet?",
            answers: {
                a: "Hunter",
                b: "Mage",
                c: "Warlock"
            },
            correctAnswer: "a"
        }
    ]

    buildQuiz();

    submitButton.addEventListener("click", showResults);

})();