const express = require('express')
const router = express.Router()
const multer = require('multer')
const sharp = require('sharp')
const bcrypt = require('bcrypt')
const User = require('../../models/User')

const auth = require('../../middleware/auth')

const upload = multer({
  limits: {
    fileSize: 100000000000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)/)) {
      return cb(new Error('Please upload a photo'))
    }
    cb(undefined, true)
  },
})

router.post('/api/temp-profile-image', upload.single('image'), auth, async (req, res) => {
  const convertedImage = await sharp(req.file.buffer).resize(250, 250).png().toBuffer()
  try {
    res.send(convertedImage.toString('base64'))
  } catch (e) {}
})

const formCheck = multer({
  limits: {
    fileSize: 1000000000000,
  },
})
router.post('/api/update-profile', formCheck.single('image'), auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id })
    console.log(user)
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.jobTitle = req.body.jobTitle
    user.email = req.body.email
    if (req.file) {
      const image = await sharp(req.file.buffer).resize(250, 250).png().toBuffer()
      user.image = image
    }
    if (req.body.currentPassword) {
      const match = await bcrypt.compare(req.body.currentPassword, user.password)
      if (match) {
        if (req.body.newPassword === req.body.confirmNewPassword) {
          console.log(req.body.newPassword)
          user.password = req.body.newPassword
        }
      } else if (!match) {
        console.log('Ikke match')
      }
    }
    await user.save()
    console.log(user)
    res.send('User was updated!')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
