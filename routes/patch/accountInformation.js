const Company = require('../../models/Company')
const auth = require('../../middleware/auth')

module.exports = (router) => {
  router.patch('/api/update-account-information', auth, async (req, res) => {
    const company = await Company.findOneAndUpdate(
      { _id: req.user.company._id },
      {
        ...req.body,
      }
    )

    await company.save()
    res.send('Success!')
  })
}
