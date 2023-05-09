/*
 *  Globale Variablen
 */
let currentQuestion = 0;
let currentListOfQuestions = questionsErdkunde;


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
    switch(quiz) {
        case 'Erdkunde':
            currentListOfQuestions = questionsErdkunde;
        break;
        case 'Bundesliga':
            currentListOfQuestions = questionsBundesliga;
        break;
        default:
            currentListOfQuestions = questionsErdkunde;
    }
    showQuestion();
}


/*
 *  Zeigt eine Frage an und rendert die Antworten
 */
function showQuestion() {
    let question = currentListOfQuestions[currentQuestion];

    document.getElementById('question').innerHTML = question['question'];
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).innerHTML = question[`answer_${i}`]   
    }
    document.getElementById('noOfCurrentQuestion').innerHTML = currentQuestion + 1;
}


/*
 *  Wertet eine Antwort aus und markiert, ob diese richtig oder falsch war. Im zweiten Fall wird die richtige Antwort markiert.
 *
 *  @Param {string} answer - Die Antwort, die angeklickt wurde. Enthält die Zahl '1', '2', '3' oder '4' als String.
 */
function makeAnswer(answer) {
    if (currentListOfQuestions[currentQuestion]['correct_answer'] == answer) {
        document.getElementById(`answer_${answer}`).classList.add('bg-color-correct');
    } else {
        document.getElementById(`answer_${answer}`).classList.add('bg-color-wrong');
        document.getElementById(`answer_${currentListOfQuestions[currentQuestion]['correct_answer']}`).classList.add('bg-color-correct');
    }
}