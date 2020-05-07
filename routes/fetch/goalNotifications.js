const auth = require('../../middleware/auth')
const GoalNotification = require('../../models/notifications/GoalNotification')
const completedLastWeek = require('../../utilFns/completedLastWeek')

// GET /tasks?limits=10&skip=10 -- remember to parseInt() since querystrings are STRINGS

// get goals completed last week
module.exports = (router) => {
  router.get('/api/goals-completed-last-week', auth, async (req, res) => {
    const companyGoalNotifications = await GoalNotification.find({
      company: req.user.company._id,
    })
    const numbers = completedLastWeek(companyGoalNotifications)
    res.send(numbers)
  })
}
