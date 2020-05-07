const mongoose = require('mongoose')

const HighfiveNotificationSchema = new mongoose.Schema({
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
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  path: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Path',
  },
})

const HighfiveNotification = mongoose.model(
  'highfivenotification',
  HighfiveNotificationSchema,
  'highfivenotifications'
)
module.exports = HighfiveNotification
