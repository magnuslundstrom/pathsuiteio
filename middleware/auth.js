const User = require('../models/User')

const auth = async (req, res, next) => {
  try {
    const user = await User.findById(req.cookies.user)
      .select('company email firstName lastName isAdmin image jobTitle isFirstTime')
      .populate('company', 'companyName')
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
    res.status(406).send('User not authenticated!')
  }
  next()
}

module.exports = auth
