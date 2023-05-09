/*
 *  Globale Variablen
 */
let currentQuestion = 0;
let currentListOfQuestions = questionsErdkunde;
let correctAnswers = 0;
let AUDIO_SUCCESS = new Audio('sound/success.mp3');
let AUDIO_FAILURE = new Audio('sound/failure.mp3');


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
    refreshProgressBar();
}


/*
 *  Aktualisiert die ProgressBar
 */
function refreshProgressBar() {
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
        AUDIO_SUCCESS.play();
        document.getElementById(`answer_${answer}`).classList.add('bg-color-correct');
        correctAnswers++;
    } else {
        AUDIO_FAILURE.play();
        document.getElementById(`answer_${answer}`).classList.add('bg-color-wrong');
        document.getElementById(`answer_${currentListOfQuestions[currentQuestion]['correct_answer']}`).classList.add('bg-color-correct');
    }
    // Weiteren Klick auf die Antworten verhindern
    switchCardClick('off');
    // Enable next-button, wenn noch nicht die letzte Frage erreicht wurde
    (currentQuestion < currentListOfQuestions.length - 1) ? document.getElementById('next-button').disabled = false : document.getElementById('next-button').disabled = true;
    // Info zur Frage anzeigen
    document.getElementById('cardInfo').innerHTML = `${currentListOfQuestions[currentQuestion]['info']}`;
}


/*
 *  Zeigt die nächste Frage an
 */
function nextQuestion() {
    document.getElementById('cardInfo').innerHTML = '';
    document.getElementById('next-button').disabled = true;
    currentQuestion++;
    switchCardClick('on');  // Klicken auf die Karten wieder ermöglichen
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


/*
 *  Zeigt das Endresultat an
 */
function showResult() {
    document.getElementById('score').innerHTML = correctAnswers;
    document.getElementById('noQuestions').innerHTML = currentListOfQuestions.length;
    document.getElementById('headerImage').src = 'img/trophy.png';
    // Auswertung anzeigen
    document.getElementById('quizFinished').style = '';
    document.getElementById('quizRunning').style = 'display: none;';
}


/* 
 *  Setzt Parameter für den Startbildschirm zurück. Notwendig, wenn ein Quiz erneut gespielt werden soll.
 */
function showStartScreen() {
    document.getElementById('headerImage').src = 'img/pencil.jpg';
    document.getElementById('quizFinished').style = 'display: none;';
    document.getElementById('quizRunning').style = '';
}


/*
 *  Wechselt den Inhalt des onclick bei den Antwortschaltflächen
 */
function switchCardClick(mode) {
    for (let i =1; i <= 4; i++) {
        let curElem = document.getElementById(`card_${i}`);
        // (mode == 'on') ? curElem.onclick = `makeAnswer('${i}');` : curElem.onclick = '';
        (mode == 'on') ? curElem.setAttribute('onclick', `makeAnswer('${i}');`) : curElem.onclick = '';
    }
}