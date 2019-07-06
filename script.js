let questionNumber = 0;
let score = 0;

function generateQuizApp () {
  return `<form class="quiz-form">
  <h2>${STORE[questionNumber].question}</h2>
  <fieldset class= 'answersAndSubmit'>
  <label class= 'dataStore ans1' >
  <input type="radio" name="answer" value="${STORE[questionNumber].ans1}" required>
  <span>${STORE[questionNumber].ans1}</span>
  </label>
  
  <label class= 'dataStore ans2' >
  <input type="radio" name="answer" value="${STORE[questionNumber].ans2}" required>
  <span>${STORE[questionNumber].ans2}</span>
  </label>

  <label class='dataStore ans3' >
  <input type="radio" name="answer" value="${STORE[questionNumber].ans3}" required>
  <span>${STORE[questionNumber].ans3}</span>
  </label>

  <label class='dataStore ans4' >
  <input type="radio" name="answer" value="${STORE[questionNumber].ans4}" required>
  <span>${STORE[questionNumber].ans4}</span>
  </label>

  <button class="js-submit" id="submitQuestion">Submit</button>
  </fieldset>
  </form>`;
}

function startQuestionForm() {
  $('.titleButton').on('click', '#startButton', event =>  {
    $('.titleButton').hide();
    $('.js-quiz').show();
    $('#currentQuestion').text(1);
  });
}

function renderQuizInHtml() {
  $('.js-quiz').html(generateQuizApp());
  $('#submitQuestion').on('click', checkAnswer);
};

function goToNextQuestion() {
  if (questionNumber < STORE.length -1) {
      questionNumber++;
      $('#currentQuestion').text(questionNumber + 1);
      renderQuizInHtml();
  }
  else {
    showResults();
    $('#restartButton').on('click',  event => {
    location.reload();
    });
  }
}

function checkAnswer() {
    let selectedAnswer = $("input[name='answer']:checked").val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`; 
    if (selectedAnswer === correctAnswer) {
      $('.js-quiz').html(`<div class = 'goodAnswer'><p>That's Right.</p>
      <img src="breaking-bad-gas-mask-aftersubmit.png" id='correct_Answer' alt= 'correctAnswerIcon'/>
      <button id='nextQ'>Next</button></div>`);      
      score++;
      $('#currentScore').text(score);
    } else {
      $('.js-quiz').html(`<div class = 'badAnswer'><p>Nope! That's not Right. Correct answer is "${correctAnswer}."</p><img src= "breaking-bad-wrong answer.jpg" id='wrong_Answer' alt= 'wrongAnswerIcon'/><button id='nextQ'>Next</button></div>`);
    }
  $('#nextQ').on('click', goToNextQuestion);
}  

function showResults() {
  if (score >= 7){
  $('.js-quiz').html(`<div class='resultPage'><h2>You finished the QUIZ and That's very good</h2><img src="finishing test.jpg" alt= 'very-good' id = 'lastImage'/><button type = 'restart' id = 'restartButton'>Restart</button></div>`);
  }  else if (score >= 4 && score <7){
      $('.js-quiz').html(`<div class='resultPage'><h2>You finished the QUIZ and That's not BAD.</h2>
      <img src="finishing test.jpg" alt= 'not-bad' id = 'lastImage'/>
      <button type = 'restart' id = 'restartButton'>Restart</button></div>`);
  } else {
      $('.js-quiz').html(`<div class='resultPage'><h2>You finished the QUIZ and That's really BAD.</h2>
      <img src="finishing test.jpg" alt= 'really-bad' id = 'lastImage'/>
      <button type = 'restart' id = 'restartButton'>Restart</button></div>`);
  }
} 

function letsGoToTheQuiz () {
  startQuestionForm();
  renderQuizInHtml();
}
$("#startButton").on('click', letsGoToTheQuiz);
