const auth = require('../../middleware/auth')
const GoalNotification = require('../../models/notifications/GoalNotification')
const completedLastWeek = require('../../utilFns/completedLastWeek')

module.exports = (router) => {
  router.get('/api/goals-completed-last-week', auth, async (req, res) => {
    const companyGoalNotifications = await GoalNotification.find({
      company: req.user.company._id,
    })
    const numbers = completedLastWeek(companyGoalNotifications)
    res.send(numbers)
  })
}
