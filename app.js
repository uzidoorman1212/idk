import { calculateQuizScore, getQuizQuestion, getTopicQuiz, quizQuestions } from './study-core.js';

const topicButtons = document.querySelectorAll('.topic-toggle');
const quizTopicButtons = document.querySelectorAll('[data-quiz-topic]');
const topicQuizCard = document.querySelector('.topic-quiz-card');
const quizQuestion = document.querySelector('#quiz-question');
const quizResult = document.querySelector('#quiz-result');
const progressLabel = document.querySelector('#progress-label');
const progressBar = document.querySelector('#progress-bar');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('nav');

let currentQuestion = 0;
let answers = [];
let selectedAnswer = null;
let activeTopic = '';
let topicQuestionIndex = 0;
let topicAnswers = [];

function toggleTopic(button) {
  const details = button.nextElementSibling;
  const isOpen = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!isOpen));
  button.querySelector('span').textContent = isOpen ? '+' : '−';
  details.hidden = isOpen;
}

topicButtons.forEach((button) => {
  button.addEventListener('click', () => toggleTopic(button));
});

function renderQuestion() {
  const question = getQuizQuestion(currentQuestion);
  selectedAnswer = null;
  quizResult.hidden = true;
  progressLabel.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
  progressBar.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;
  quizQuestion.innerHTML = `
    <p class="question-number">Question ${currentQuestion + 1}</p>
    <h3>${question.prompt}</h3>
    <div class="answer-list">
      ${question.choices.map((choice, index) => `
        <button class="answer" type="button" data-answer="${index}">
          <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
          ${choice}
        </button>
      `).join('')}
    </div>
    <button class="button button-primary next-button" type="button" disabled>Next question <span aria-hidden="true">→</span></button>
  `;

  quizQuestion.querySelectorAll('.answer').forEach((button) => {
    button.addEventListener('click', () => {
      selectedAnswer = Number(button.dataset.answer);
      quizQuestion.querySelectorAll('.answer').forEach((answer) => {
        answer.classList.remove('selected');
        answer.disabled = true;
      });
      button.classList.add('selected');
      quizQuestion.querySelector('.next-button').disabled = false;
    });
  });

  quizQuestion.querySelector('.next-button').addEventListener('click', () => {
    answers.push(selectedAnswer);
    if (currentQuestion < quizQuestions.length - 1) {
      currentQuestion += 1;
      renderQuestion();
    } else {
      showResults();
    }
  });
}

function showResults() {
  const correctAnswers = quizQuestions.map((question) => question.choices.indexOf(question.answer));
  const score = calculateQuizScore(answers, correctAnswers);
  const percentage = Math.round((score / quizQuestions.length) * 100);
  quizQuestion.hidden = true;
  quizResult.hidden = false;
  progressLabel.textContent = `Final score: ${score} / ${quizQuestions.length}`;
  progressBar.style.width = '100%';
  quizResult.innerHTML = `
    <div class="result-badge">${percentage}%</div>
    <p class="eyebrow">Quiz complete</p>
    <h2>${score === quizQuestions.length ? 'Excellent journey!' : score >= 3 ? 'Strong study!' : 'Keep exploring!'}</h2>
    <p>You scored <strong>${score} out of ${quizQuestions.length}</strong>. Review the topic cards above, then try the quiz again.</p>
    <button class="button button-primary" type="button" id="restart-quiz">Try again</button>
  `;
  document.querySelector('#restart-quiz').addEventListener('click', restartQuiz);
}

function restartQuiz() {
  currentQuestion = 0;
  answers = [];
  quizQuestion.hidden = false;
  renderQuestion();
  quizQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function renderTopicQuestion() {
  const questions = getTopicQuiz(activeTopic);
  const question = questions[topicQuestionIndex];
  selectedAnswer = null;
  topicQuizCard.innerHTML = `
    <div class="topic-question-card">
      <p class="topic-question-title">${activeTopic} · Question ${topicQuestionIndex + 1} of ${questions.length}</p>
      <h3>${question.prompt}</h3>
      <div class="answer-list">
        ${question.choices.map((choice, index) => `
          <button class="answer" type="button" data-topic-answer="${index}">
            <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
            ${choice}
          </button>
        `).join('')}
      </div>
      <button class="button button-primary next-button" type="button" disabled>Next question <span aria-hidden="true">→</span></button>
    </div>
  `;

  topicQuizCard.querySelectorAll('[data-topic-answer]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedAnswer = Number(button.dataset.topicAnswer);
      topicQuizCard.querySelectorAll('[data-topic-answer]').forEach((answer) => {
        answer.classList.remove('selected');
        answer.disabled = true;
      });
      button.classList.add('selected');
      topicQuizCard.querySelector('.next-button').disabled = false;
    });
  });

  topicQuizCard.querySelector('.next-button').addEventListener('click', () => {
    topicAnswers.push(selectedAnswer);
    if (topicQuestionIndex < questions.length - 1) {
      topicQuestionIndex += 1;
      renderTopicQuestion();
    } else {
      showTopicResults();
    }
  });
}

function startTopicQuiz(topic) {
  activeTopic = topic;
  topicQuestionIndex = 0;
  topicAnswers = [];
  quizTopicButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.quizTopic === topic);
  });
  renderTopicQuestion();
}

function showTopicResults() {
  const questions = getTopicQuiz(activeTopic);
  const correctAnswers = questions.map((question) => question.choices.indexOf(question.answer));
  const score = calculateQuizScore(topicAnswers, correctAnswers);
  const percentage = Math.round((score / questions.length) * 100);
  const message = score === questions.length ? 'A true Viking champion!' : score >= 2 ? 'Great exploring!' : 'A perfect place to learn!';
  topicQuizCard.innerHTML = `
    <div class="topic-score">
      <div class="result-badge">${percentage}%</div>
      <p class="eyebrow">${activeTopic} quiz complete</p>
      <h3>${message}</h3>
      <p>You scored <strong>${score} out of ${questions.length}</strong>. Learn the topic cards, then play again.</p>
      <button class="button button-primary" type="button" id="restart-topic-quiz">Play again</button>
    </div>
  `;
  document.querySelector('#restart-topic-quiz').addEventListener('click', () => startTopicQuiz(activeTopic));
}

quizTopicButtons.forEach((button) => {
  button.addEventListener('click', () => startTopicQuiz(button.dataset.quizTopic));
});

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

renderQuestion();
