const Company = require('../../models/Company')
const User = require('../../models/User')
const auth = require('../../middleware/auth')
const errorHandler = require('../../utilFns/errorHandler')

module.exports = (router) => {
  // @@ Used to create a company once a user has signed up
  router.post('/api/create-company', auth, async (req, res) => {
    try {
      const company = new Company({
        companyName: req.body.companyName,
        users: req.user._id,
      })
      await company.save()
      await User.findByIdAndUpdate(req.user._id, { company: company._id })
      res.send({ message: 'Company was succesfully created!' })
    } catch (e) {
      const newErrors = errorHandler(e)
      console.log(e)
      res.status(406).send(newErrors)
    }
  })
}
