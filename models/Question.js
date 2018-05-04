const mongoose = require('mongoose');

const question = new mongoose.Schema({
  options: Array,
  result: String,
  operation: String,
  text: String,
  state: String
});


const Question = mongoose.model('Question', question);

Question.types = {
    MATH: 'MATH',
    SPORT: 'SPORT',
}

Question.states = {
    APPROVED: 'APPROVED',
    INITIAL: 'INITIAL',
}

module.exports = Question;