const multer = require('multer')
const sharp = require('sharp')
const bcrypt = require('bcrypt')
const User = require('../../models/User')
const auth = require('../../middleware/auth')

module.exports = (router) => {
  // @@ Multer image middleware config
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

  // @@ Allows for user to add temporary photo and delete it again
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

  // @@ Updates user on submit
  router.post('/api/update-profile', formCheck.single('image'), auth, async (req, res) => {
    try {
      const { password } = await User.findOne({ _id: req.user._id })
      // @@ contains all updates adding dynamicly depending on inputs
      const updates = {}
      updates.firstName = req.body.firstName
      updates.lastName = req.body.lastName
      updates.jobTitle = req.body.jobTitle
      updates.email = req.body.email
      if (req.file) {
        const image = await sharp(req.file.buffer).resize(250, 250).png().toBuffer()
        updates.image = image
      }
      if (req.body.currentPassword) {
        const match = await bcrypt.compare(req.body.currentPassword, password)
        if (match) {
          if (req.body.newPassword === req.body.confirmNewPassword) {
            updates.password = await bcrypt.hash(req.body.newPassword, 8)
          }
        } else if (!match) {
          res.status(406).send("Password doesn't match")
        }
      }
      await User.updateOne({ _id: req.user._id }, { ...updates })
      res.send('User was updated!')
    } catch (e) {
      res.status(401).send(e)
    }
  })
}
