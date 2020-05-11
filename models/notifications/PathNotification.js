const mongoose = require('mongoose')

const PathNotificationSchema = new mongoose.Schema({
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
  path: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Path',
    unique: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
  },
})

const PathNotification = mongoose.model(
  'pathnotification',
  PathNotificationSchema,
  'pathnotifications'
)
module.exports = PathNotification
