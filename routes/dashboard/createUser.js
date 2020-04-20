const express = require('express')
const router = express.Router()
// const fs = require('fs')
// const path = require('path')
// const sharp = require('sharp')
const auth = require('../../middleware/auth')

const User = require('../../models/User')

router.post('/api/create-user', auth, async (req, res) => {
  try {
    console.log(req.body)
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      jobTitle: req.body.jobTitle,
      company: req.user.company._id,
      isAdmin: req.body.isAdmin,
      // image: compressedImg,
    })
    await user.save()
    res.send('User successfully created')
  } catch (e) {
    console.log(e)
  }

  // fs.readFile(path + '../../files/anonym-user.jpg', async (err, image) => {
  //   const compressedImg = await sharp(image).resize(250, 250).png().toBuffer()
  // })
})

module.exports = router
