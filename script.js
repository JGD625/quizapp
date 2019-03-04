'use strict';

const questionSet = [
  { 
    number: 1,
    text: `What is an Americano is made of?`,
    ans1:'Caramel syrup, espresso, and steamed milk',
    ans2:'Espresso and cream',
    ans3:'Black coffee and milk',
    ans4:'Hot water and one shot of espresso'
  }, 

  {
    number: 2,
    text: 'Which recipe will create a Cafe Latte?',
    ans1: '1 part espresso to 3 parts steamed milk and froth on top',
    ans2: 'An espresso shot with milk froth and cinnamon',
    ans3: 'White chocolate sauce, espresso, and milk',
    ans4: '1 part espresso to 3 parts hot milk and whipped cream on top'
  }, 

  {
    number: 3,
    text: 'What three ingredients make a Cuban Coffee?',
    ans1: 'Drip coffee, milk, and sugar',
    ans2: 'Water, espresso, and sugar',
    ans3: 'Espresso, ice, and sugar',
    ans4: 'Milk, espresso, and sugar'
  }, 

  {
    number: 4, 
    text: 'Espresso Con Panna has what on top?',
    ans1: 'A cherry',
    ans2: 'Milk froth',
    ans3: 'Cinnamon and nutmeg',
    ans4: 'Whipped cream'
  }, 

  {
    number: 5,
    text: 'What boozy coffee drink has whiskey and whipped cream?',
    ans1: 'Irish Coffee',
    ans2: 'German Coffee',
    ans3: 'Scotch Coffee',
    ans4: 'Kentucky Good Morning'
  }, 

  {
    number: 6,
    text: 'What special ingredient makes a Breve?',
    ans1: 'Whipped Cream',
    ans2: 'Half and half',
    ans3: 'Brown sugar',
    ans4: 'Kopi Luwak coffee beans'
  }, 

  {
    number: 7,
    text: 'What is in a Cafe Mocha?',
    ans1: 'Espresso blended with chocolate milk and ice',
    ans2: 'Chocolate ice cream with a shot of espresso',
    ans3: '⅔ steamed milk ⅓ espresso, chocolate syrup',
    ans4: 'One shot of Espresso and hot water'
  }, 

  {
    number: 8,
    text: 'What do you call coffee with one shot of espresso dropped in?',
    ans1: 'A Black Eye',
    ans2: 'A Red Eye',
    ans3: 'A Turkish Delight',
    ans4: 'A Black Out'
  }, 

  {
    number: 9,
    text: 'What fruit is in a Roman?',
    ans1: 'A slice of melon',
    ans2: 'A grapefruit wedge',
    ans3: 'A lemon twist',
    ans4: 'Fresh berries'
  }, 

  {
    number: 10,
    text: 'If you have equal parts espresso and steamed milk, what are you drinking?',
    ans1: 'A Cortado',
    ans2: 'A Coronado',
    ans3: 'A Colorado',
    ans4: 'A Contata'
  }
];

const ANSWERS = [ 
  'Hot water and one shot of espresso', 
  '1 part espresso to 3 parts steamed milk and froth on top', 
  'Water, espresso, and sugar', 
  'Whipped cream', 
  'Irish Coffee', 
  'Half and half', 
  '⅔ steamed milk ⅓ espresso, chocolate syrup', 
  'A Black Eye', 
  'A lemon twist', 
  'A Cortado'
];

let questionNum = 1;

let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>
    
    <form id="question-form">
      <fieldset>
        <label class="answerOption">
          <input class="answer" type="radio" name="option" required></input>
          <span>${question.ans1}</span>
        </label>
  
        <label class="answerOption">
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans2}</span>
        </label>
  
        <label class="answerOption">
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans3}</span>
        </label>
  
        <label class="answerOption">
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>  
      <button id="js-submit-button" class="submitbutton">Submit</button>

    </form>

    <div id="status-bar">
    <ul>
    <li><span id="question-count">Question: ${question.number}</span></li>
    <li> <span id="score-count">Score: ${correctAnswers}/10</span></li>
    </ul>
    </div>
  </section>
  `;
}

function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}

$(document).ready(function() {
  var target = $("#title");
  $("#js-start-button").click(function() {
    removeElement(target);
  });
});

function removeElement(target) {
  target.animate({
    opacity: "-=1"
  }, 1000, function() {
     target.remove();
     showImage();
  });
}

function showImage(){
    document.getElementById('logo').style.visibility='visible';
    }


function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } 
      else if ( $("input[type=radio]:checked").length < 1 ) {
      swal('Please select one.');
}
      else {
      generateIncorrectFeedback();
    }
  });
}

function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {

    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2>That's right!</h2>
    <button id="js-next-button">Next</button>
  </section>
`;

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>I'm afraid not. It was ${ANSWERS[questionNum - 1]}!</h2>
      <button id="js-next-button">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
    if (correctAnswers >= 8) {
      $('#container').html(`<div class="results correctFeedback"><h3>I bet your barista knows you by name.</h3><img class="correctImage" src="https://static.wixstatic.com/media/d9f074_76b65470b08a40919e9afae99de50861~mv2.png" alt="Coffee Cup"><p>You got ${correctAnswers} / 10</p><p>You must be a caffeine addict!</p><button id="js-restart-button">Restart Quiz</button></div>`);
    } else if (correctAnswers < 8 && correctAnswers >= 5) {
      $('#container').html(`<div class="results correctFeedback"><h3>Not half bad.</h3><img class="incorrectImage" src="https://static.wixstatic.com/media/d9f074_76b65470b08a40919e9afae99de50861~mv2.png" alt="Coffee Cup"><p>You got ${correctAnswers} / 10</p><p>You're no barista, but you'll get there some day.</p><button id="js-restart-button">Restart Quiz</button></div>`);
    } else {
      $('#container').html(`<div class="results correctFeedback"><h3>More of the tea type, I take it?</h3><img class="incorrectImage" src="https://static.wixstatic.com/media/d9f074_06ef2b7629124c969322b2d92f0286d7~mv2.png" alt="Spilled Coffee"><p>You got ${correctAnswers} / 10</p><p>You might want to start with a frap...</p><button id="js-restart-button">Restart Quiz</button></div>`);
    }
  }

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();