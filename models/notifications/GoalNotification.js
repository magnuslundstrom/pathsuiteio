const mongoose = require('mongoose')

const GoalNotificationSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  path: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Path',
  },
})

const GoalNotification = mongoose.model(
  'goalnotification',
  GoalNotificationSchema,
  'goalnotifications'
)
module.exports = GoalNotification
