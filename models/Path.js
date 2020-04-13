const mongoose = require('mongoose')

const PathSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please select an appropriate title'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  responsible: {
    type: String,
    required: [true, 'Please provide a responsible person'],
  },
  steps: [
    {
      goalTitle: {
        type: String,
      },
      goalType: {
        type: String,
      },
      goalLink: {
        type: String,
      },
      goalNote: {
        type: String,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },

  startingDate: {
    type: Date,
  },
  endingDate: {
    type: Date,
  },
})

const Path = mongoose.model('Path', PathSchema, 'paths')
module.exports = Path
