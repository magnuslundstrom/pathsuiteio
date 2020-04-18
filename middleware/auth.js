const User = require('../models/User')

const auth = async (req, res, next) => {
  try {
    const user = await User.findById(req.cookies.user)
      .select('company email firstName lastName isAdmin image jobTitle')
      .populate('company')
      .exec()
    if (user) {
      const image = user.image.toString('base64')
      req.user = {
        ...user._doc,
        image,
      }
    } else {
      throw new Error()
    }
  } catch (e) {
    res.status(401).send()
  }
  next()
}

module.exports = auth
