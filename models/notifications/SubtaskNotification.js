const mongoose = require('mongoose')

const SubtaskNotificationSchema = new mongoose.Schema({
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
  subtask: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  path: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Path',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
  },
})

const SubtaskNotification = mongoose.model(
  'subtasknotification',
  SubtaskNotificationSchema,
  'subtasknotifications'
)
module.exports = SubtaskNotification
