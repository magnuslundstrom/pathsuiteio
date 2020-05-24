const mongoose = require('mongoose')

const PathSchema = new mongoose.Schema({
  pathTitle: {
    type: String,
    required: [true, 'Please select an appropriate title'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  goal: {
    type: String,
    required: [true, 'Provide a goal description'],
  },
  subtasks: [
    {
      subtaskTitle: {
        type: String,
      },
      subtaskType: {
        type: String,
      },
      subtaskLink: {
        type: String,
        lowercase: true,
      },
      subtaskNote: {
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
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
})

PathSchema.pre('save', function (next) {
  const pattern = /^((http|https):\/\/)/
  this.subtasks.forEach((subtask) => {
    if (subtask.subtaskLink && !pattern.test(subtask.subtaskLink))
      subtask.subtaskLink = 'https://' + subtask.subtaskLink
  })
  next()
})

const Path = mongoose.model('Path', PathSchema, 'paths')
module.exports = Path
