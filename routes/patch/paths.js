const auth = require('../../middleware/auth')
const Path = require('../../models/Path')

module.exports = (router) => {
  router.post('/api/update-goal-status', auth, async (req, res) => {
    const path = await Path.findById(req.body.pathId)
    const stepIndex = path.steps.findIndex((step) => {
      return step._id == req.body.stepId
    })
    path.steps[stepIndex].isCompleted = !path.steps[stepIndex].isCompleted
    await path.save()
  })
}
