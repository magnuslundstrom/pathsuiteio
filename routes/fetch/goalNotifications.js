const moment = require('moment')
const auth = require('../../middleware/auth')
const GoalNotification = require('../../models/notifications/GoalNotification')
const completedWeek = require('../../utilFns/completedWeek')
const completedYear = require('../../utilFns/completedYear')

// GET /tasks?limits=10&skip=10 -- remember to parseInt() since querystrings are STRINGS

// get goals completed last week
module.exports = (router) => {
  router.get('/api/goals-completed', auth, async (req, res) => {
    const period = req.query.when
    const companyGoalNotifications = await GoalNotification.find({
      company: req.user.company._id,
    })
    let numbers
    if (period.includes('week')) numbers = completedWeek(companyGoalNotifications, period)
    if (period.includes('year')) numbers = completedYear(companyGoalNotifications, period)
    res.send(numbers)
  })

  // Get the notifications in sidebar
  router.get('/api/goal-notifications', auth, async (req, res) => {
    try {
      const companyGoalNotifications = await GoalNotification.find({
        company: req.user.company._id,
      })
        .select('date description user')
        .populate('user', 'firstName lastName image')
        .exec()
      const newGoals = []
      companyGoalNotifications.forEach((noti) => {
        const image = noti.user._doc.image.toString('base64')
        const date = moment(noti.date).format('MMM Do')
        const notification = { ...noti._doc, user: { ...noti._doc.user._doc, image }, date }
        newGoals.unshift(notification)
      })
      res.send(newGoals)
    } catch (e) {
      res.status(401).send(e)
    }
  })
}
