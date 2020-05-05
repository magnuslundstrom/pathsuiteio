const auth = require('../../middleware/auth')
const Path = require('../../models/Path')

module.exports = (router) => {
  router.post('/api/update-goal-status', auth, async (req, res) => {
    const path = await Path.findById(req.body.pathId)
    const goalIndex = path.goals.findIndex((goal) => goal._id == req.body.goalId)
    path.goals[goalIndex].isCompleted = !path.goals[goalIndex].isCompleted
    await path.save()
  })

  router.patch('/api/update-path', auth, async (req, res) => {
    await Path.findByIdAndUpdate(req.query.id, { ...req.body })
    res.send({ message: 'Successfully updated!' })
  })

  router.get('/api/delete-path', auth, async (req, res) => {
    console.log(req.query.id)
    await Path.findByIdAndDelete(req.query.id)
    res.send({ message: 'Successfully deleted!' })
  })
}
