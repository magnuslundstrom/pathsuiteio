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
  startingDate: {
    type: Date,
  },
  endingDate: {
    type: Date,
  },
  steps: [
    {
      title: {
        type: String,
      },
      type: {
        type: String,
      },
      link: {
        type: String,
      },
      note: {
        type: String,
      },
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
})

const Path = mongoose.model('Path', PathSchema, 'paths')
module.exports = Path
