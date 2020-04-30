const auth = require('../../middleware/auth')
const Path = require('../../models/Path')

module.exports = (router) => {
  router.post('/api/update-goal-status', auth, async (req, res) => {
    const path = await Path.findById(req.body.pathId)
    const goalIndex = path.goals.findIndex((goal) => goal._id == req.body.goalId)

    path.goals[goalIndex].isCompleted = !path.goals[goalIndex].isCompleted
    await path.save()
  })
}
