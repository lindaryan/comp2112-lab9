const api = 'https://opentdb.com/api.php?amount=15&category=18&type=multiple';

const money = [
  { level: '15', amount: '1,000,000' },
  { level: '14', amount: '500,000' },
  { level: '13', amount: '250,000' },
  { level: '12', amount: '100,000' },
  { level: '11', amount: '50,000' },
  { level: '10', amount: '25,000' },
  { level: '9', amount: '16,000' },
  { level: '8', amount: '8,000' },
  { level: '7', amount: '4,000' },
  { level: '6', amount: '2,000' },
  { level: '5', amount: '1,000' },
  { level: '4', amount: '500' },
  { level: '3', amount: '300' },
  { level: '2', amount: '200' },
  { level: '1', amount: '100' },
];

new Vue({
  el: '#app',
  data: {
    api,
    money,
    questions: [],
    // play: false,
    qIndex: 0,
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: '',
    correctLetter: '',
  },
  // fetches the questions
  async created() {
    const res = await fetch(this.api);
    const data = await res.json();
    this.questions = data.results;

    this.displayQ();
  },
  watch: {
     qIndex() {
       this.displayQ();
     }
  },
  methods: {
      // displays the questions
    displayQ() {
      this.parseCurrQ();
      this.shuffleAnswers();
    },

    // current question and correct answer
    parseCurrQ() {
      this.question = this.questions[this.qIndex].question;
      this.correctAnswer = this.questions[this.qIndex].correct_answer;
    },

    // shuffle answers so correct answer is randomly placed a/b/c/d
    shuffleAnswers() {
      const answers = [this.correctAnswer, ...this.questions[this.qIndex].incorrect_answers];
      answers.sort(() => Math.random() - 0.5);
      [this.answer1, this.answer2, this.answer3, this.answer4] = answers;
      this.correctLetter = answers.findIndex(a => a === this.correctAnswer)
    },

    // checks if selected answer is correct by matching index of correctAnswer to a/b/c/d
    isAnswer(letter) {
      const input = ['a', 'b', 'c', 'd'];
      const index = input.findIndex(char => char === letter);
      console.log(letter)
      // if answer is correct, move to next question
      if(index === this.correctLetter)
        {
          this.qIndex += 1;
        }
      // if answer is incorrect, stop game
      else {
        alert('Try Again!');
      }
    }
  }
})
