let currentQuestion = 0;
let currentListOfQuestions = questionsErdkunde;

// Start des Programms
function init() {

    // maxQuestions setzen
    document.getElementById('maxQuestions').innerHTML = questionsErdkunde.length;

    showQuestion();
}


function showQuestion() {
    let question = currentListOfQuestions[currentQuestion];

    document.getElementById('question').innerHTML = question['question'];
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).innerHTML = question[`answer_${i}`]   
    }
    document.getElementById('noOfCurrentQuestion').innerHTML = currentQuestion + 1;
}


function makeAnswer(answer) {
    if (currentListOfQuestions[currentQuestion]['correct_answer'] == answer) {
        document.getElementById(`answer_${answer}`).style.backgroundColor = 'lightgreen';
    } else {
        document.getElementById(`answer_${answer}`).style.backgroundColor = 'lightcoral';
        document.getElementById(`answer_${currentListOfQuestions[currentQuestion]['correct_answer']}`).style.backgroundColor = 'lightgreen';
    }
}