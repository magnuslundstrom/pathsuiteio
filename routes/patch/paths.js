const auth = require('../../middleware/auth')
const Path = require('../../models/Path')
const GoalNotification = require('../../models/notifications/GoalNotification')
const PathNotification = require('../../models/notifications/PathNotification')

module.exports = (router) => {
  router.post('/api/update-goal-status', auth, async (req, res) => {
    try {
      // Essential logic updating goal status
      const path = await Path.findById(req.body.pathId)
        .populate('user', 'firstName lastName')
        .exec()
      console.log(path)
      const goalIndex = path.goals.findIndex((goal) => goal._id == req.body.goalId)
      path.goals[goalIndex].isCompleted = !path.goals[goalIndex].isCompleted
      await path.save()

      // @@ Notification logic -- REFACTOR -- CONSIDER: MIDDLEWARE, POST.SAVE ON MODEL, PRE.SAVE ON MODEL

      // GOAL NOTIFICATION
      if (path.goals[goalIndex].isCompleted) {
        const goalNotification = new GoalNotification({
          description: `${path.user.firstName} ${path.user.lastName} completed the goal "${path.goals[goalIndex].goalTitle}"`,
          user: path.user._id,
          goal: path.goals[goalIndex]._id,
          path: path._id,
          company: req.user.company._id,
        })
        await goalNotification.save()
      } else {
        await GoalNotification.findOneAndDelete({ goal: path.goals[goalIndex]._id })
      }

      // PATH NOTIFICATION
      if (path.goals.every((goal) => goal.isCompleted)) {
        const pathNotification = new PathNotification({
          description: `${path.user.firstName} ${path.user.lastName} completed the path "${path.title}"`,
          path: path._id,
          user: path.user._id,
          company: req.user.company._id,
        })
        await pathNotification.save()
      } else {
        await PathNotification.findOneAndDelete({ path: path._id })
      }
    } catch (e) {
      res.status(401).send(e)
    }
  })

  router.patch('/api/update-path', auth, async (req, res) => {
    await Path.findByIdAndUpdate(req.query.id, { ...req.body })
    res.send({ message: 'Successfully updated!' })
  })
}
