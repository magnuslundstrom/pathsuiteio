const User = require('../models/User')
const Company = require('../models/Company')

const auth = async (req, res, next) => {
  try {
    const user = await User.findById(req.cookies.user).select(
      'company email firstName lastName isAdmin'
    )
    if (user) {
      req.user = user
    } else {
      throw new Error()
    }
  } catch (e) {
    res.status(401).send()
  }
  next()
}

module.exports = auth
