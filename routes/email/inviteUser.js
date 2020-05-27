const sgMail = require('@sendgrid/mail')
const auth = require('../../middleware/auth')

const { SENDGRID_API } = require('../../config/keys')
sgMail.setApiKey(SENDGRID_API)

// Used to send out emails to the invited user
module.exports = (router) => {
  router.post('/api/invite-user', auth, async (req, res) => {
    // if the app is in production sends link to prod URL else localhost
    let ahref = process.env.NODE_ENV === 'production' ? 'https://pathsuiteio.herokuapp.com' : 'http://localhost:3000'

    ahref = ahref + `/invited-user?email=${req.body.email}&isAdmin=${req.body.isAdmin}&company=${req.user.company._id}`
    // The message being sent
    const msg = {
      to: req.body.email,
      from: 'pathsuite@opholdsguide.dk',
      subject: `${req.user.firstName} ${req.user.lastName} just invited you to join Pathsuite!`,
      html: `
            <h1>Join ${req.user.company.companyName} on Pathsuite!</h1>
            <p>${req.user.firstName} wants to see you on their Pathsuite team!</p>
            <p>Sign up today and start exploring your learning paths</p>
            <a href=${ahref} target="_blank" style="background-color: #46cc8c; color: white; padding: 10px 20px; text-decoration: none;">Join now!</a>
            `,
    }
    try {
      await sgMail.send(msg)
      res.send({ msg: 'Success' })
    } catch (e) {
      res.status(401).send(e)
    }
  })
}
