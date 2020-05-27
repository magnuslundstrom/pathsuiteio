const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const User = require('../../models/User')
const auth = require('../../middleware/auth')

const setCookie = require('../../utilFns/setCookie')
const errorHandler = require('../../utilFns/errorHandler')

module.exports = (router) => {
  // @@ Used to add a new user to the company
  router.post('/api/create-user', auth, (req, res) => {
    // read file from ../../files and compresses image and sets to user
    fs.readFile(path.join(__dirname, '../', '../', 'files', 'anonym-user.jpg'), async (err, image) => {
      const compressedImg = await sharp(image).resize(250, 250).png().toBuffer()
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        jobTitle: req.body.jobTitle,
        company: req.user.company._id,
        isAdmin: req.body.isAdmin,
        image: compressedImg,
      })
      try {
        await user.save()
        res.send('User successfully created')
      } catch (e) {
        res.status(401).send(errorHandler(e))
      }
    })
  })

  // @@ Used to sign up the first user of a company
  router.post('/api/sign-up', async (req, res) => {
    // read file from ../../files and compresses image and sets to user
    fs.readFile(path.join(__dirname, '../', '../', 'files', 'anonym-user.jpg'), (err, data) => {
      sharp(data)
        .resize(250, 250)
        .png()
        .toBuffer()
        .then((newPhoto) => {
          const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin || true,
            image: newPhoto,
            company: req.body.company || undefined,
          })
          user
            .save()
            .then((user) => {
              setCookie(res, user._id)
              res.send({ success: 'User was successfully created' })
            })
            .catch((e) => {
              res.status(401).send(errorHandler(e))
            })
        })
    })
  })
}
