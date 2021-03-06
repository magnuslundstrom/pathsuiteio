const Company = require('../../models/Company')
const auth = require('../../middleware/auth')

module.exports = (router) => {
  router.get('/api/account-information', auth, async (req, res) => {
    const company = await Company.findOne({ _id: req.user.company._id })
    res.send(company)
  })
}
