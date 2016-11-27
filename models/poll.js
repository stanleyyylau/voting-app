var mongoose = require('mongoose');

var Poll = mongoose.model('Poll', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  options: [{
    option: {
      type: String,
      trim: true
    },
    votes: {
      type: Number,
      default: 0
    }
  }],
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Poll};
