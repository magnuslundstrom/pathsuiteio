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
    // await User.findOneAndUpdate({ _id: req.user._id }, { image: convertedImage })
    res.send(convertedImage.toString('base64'))
  } catch (e) {}
})

router.get('/api/james', auth, (req, res) => {})

module.exports = router
