/*
 *  Globale Variablen
 */
let currentQuestion = 0;
let currentListOfQuestions = questionsErdkunde;
let correctAnswers = 0;


/*
 *  Start des Programms. Wird im onload-Event des Body geladen.
 */
function init() {
    // Vorgabe ist questionErdkunde - maxQuestions setzen
    document.getElementById('maxQuestions').innerHTML = questionsErdkunde.length;

    showQuestion();
}


/*
 *  Funktion zum Start eines Quizzes.
 *  Wird aufgerufen bei Klick auf eine der Auswahlmöglichkeiten in der NavBar
 * 
 *  @Param {string} quiz - Name des Quizzes, das gestartet werden soll
 */
function startQuiz(quiz) {
    currentQuestion = 0;
    correctAnswers = 0;

    switch (quiz) {
        case 'Erdkunde':
            currentListOfQuestions = questionsErdkunde;
            break;
        case 'Bundesliga':
            currentListOfQuestions = questionsBundesliga;
            break;
        default:
            // currentListOfQuestions = questionsErdkunde;
            // Wiederholt das gerade gespielte Quiz
    }
    document.getElementById('maxQuestions').innerHTML = currentListOfQuestions.length;
    showStartScreen();
    showQuestion();
}


/*
 *  Zeigt eine Frage an und rendert die Antworten
 */
function showQuestion() {
    let question = currentListOfQuestions[currentQuestion];

    document.getElementById('question').innerHTML = question['question'];
    for (let i = 1; i <= 4; i++) {
        let curElem = document.getElementById(`answer_${i}`);
        resetAnswerButton(curElem);
        curElem.innerHTML = question[`answer_${i}`]
    }
    document.getElementById('noOfCurrentQuestion').innerHTML = currentQuestion + 1;
    let percent = Math.round(((currentQuestion + 1) / currentListOfQuestions.length) * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style.width = `${percent}%`;
}


/*
 *  Wertet eine Antwort aus und markiert, ob diese richtig oder falsch war. Im zweiten Fall wird die richtige Antwort markiert.
 *
 *  @Param {string} answer - Die Antwort, die angeklickt wurde. Enthält die Zahl '1', '2', '3' oder '4' als String.
 */
function makeAnswer(answer) {
    if (currentListOfQuestions[currentQuestion]['correct_answer'] == answer) {
        document.getElementById(`answer_${answer}`).classList.add('bg-color-correct');
        correctAnswers++;
    } else {
        document.getElementById(`answer_${answer}`).classList.add('bg-color-wrong');
        document.getElementById(`answer_${currentListOfQuestions[currentQuestion]['correct_answer']}`).classList.add('bg-color-correct');
    }
    // Enable next-button, wenn noch nicht die letzte Frage erreicht wurde
    if (currentQuestion < currentListOfQuestions.length - 1) {  // length-1 weil currentQuestion bei 0 beginnt
        document.getElementById('next-button').disabled = false;
    } else {
        showResult();
    }
}


/*
 *  Zeigt die nächste Frage an
 */
function nextQuestion() {
    document.getElementById('next-button').disabled = true;
    currentQuestion++;
    showQuestion();
}


/*
 *  Entfernt die Markierungen von den Antwort-Elementen
 *
 *  @Param {element} buttonElement - Das Element, daß einen Antwort-Button repräsentiert
 */
function resetAnswerButton(buttonElement) {
    buttonElement.classList.remove('bg-color-correct');
    buttonElement.classList.remove('bg-color-wrong');
}


function showResult() {
    document.getElementById('score').innerHTML = correctAnswers;
    document.getElementById('noQuestions').innerHTML = currentListOfQuestions.length;
    document.getElementById('headerImage').src = 'img/trophy.png';
    // Auswertung anzeigen
    document.getElementById('quizFinished').style = '';
    document.getElementById('quizRunning').style = 'display: none;';
}


function showStartScreen() {
    document.getElementById('headerImage').src = 'img/pencil.jpg';
    document.getElementById('quizFinished').style = 'display: none;';
    document.getElementById('quizRunning').style = '';
}