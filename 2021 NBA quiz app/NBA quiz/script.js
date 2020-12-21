const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .6)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Who will win rookie of the year?',
    answers: [
      { text: 'Lamelo Ball', correct: true },
      { text: 'Anthony Edwards', correct: false }

    ]
  },
  {
    question: 'Who is the best NBA player?',
    answers: [
      { text: 'Lebron James', correct: true },
      { text: 'Kevin Durant', correct: false },
      { text: 'Kyrie Irving', correct: false},
      { text: 'Kawhi Leanord', correct: false }
    ]
  },
  {
    question: 'Who is the best 3-point shooter?',
    answers: [
      { text: 'Stephen Curry', correct: true },
      { text: 'Klay Thompson', correct: false },
      { text: 'JJ Reddick', correct: false },
      { text: 'Duncan Robinson', correct: false }
    ]
  },
  {
    question: 'Who will win the 2021 NBA championship?',
    answers: [
      { text: 'Los Angeles Lakers', correct: true },
      { text: 'Brooklyn Nets', correct: false }
    ]
  },

  {
    question: 'Who is the best dunker in the NBA?',
    answers: [
      { text: 'Zach Lavine', correct: true },
      { text: 'Aaron Gordan', correct: false },
      { text: 'Derrick Jones Jr.', correct: false},
      { text: 'Jalen Lecque', correct: false }
    ]
  }
]