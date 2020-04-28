const Path = require('../../models/Path')
const auth = require('../../middleware/auth')

module.exports = (router) => {
  // @@ Used to create a new path
  router.post('/api/create-path', auth, async (req, res) => {
    const path = new Path({
      ...req.body,
      company: req.user.company._id,
    })
    await path.save()
    res.send(path)
  })
}

/*
req.body consist of:
title,
category,
user,
responsible,
[steps],
*/
