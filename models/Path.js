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
  goals: [
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
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  deadline: {
    type: Date,
  },
})

const Path = mongoose.model('Path', PathSchema, 'paths')
module.exports = Path
