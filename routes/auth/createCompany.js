const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Company = require('../../models/Company')
const errorHandler = require('../../utils/errorHandler')

router.post('/api/create-company', auth, async (req, res) => {
  try {
    const user = req.user
    const company = new Company({
      companyName: req.body.companyName,
      users: user._id,
    })
    await company.save()
    await user.updateOne({ company: company._id })
    res.send({ message: 'Company was succesfully created!' })
  } catch (e) {
    const newErrors = errorHandler(e)
    res.status(406).send(newErrors)
  }
})

module.exports = router
