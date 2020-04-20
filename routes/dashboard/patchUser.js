const express = require('express')
const router = express.Router()
const multer = require('multer')
const sharp = require('sharp')
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
    const image = req.file ? 'image' : ''
    const convertedImage = req.file
      ? await sharp(req.file.buffer).resize(250, 250).png().toBuffer()
      : ''

    await User.findByIdAndUpdate(req.user._id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      jobTitle: req.body.jobTitle,
      email: req.body.email,
      [`${image}`]: convertedImage,
    })
    res.send('User was updated!')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
