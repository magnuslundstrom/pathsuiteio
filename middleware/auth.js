const User = require('../models/User')
const Company = require('../models/Company')

const auth = async (req, res, next) => {
  try {
    const user = await User.findById(req.cookies.user)
    if (user) {
      req.user = user
    } else {
      throw new Error()
    }
  } catch (e) {
    res.status(406).send(e)
  }
  next()
}

module.exports = auth
