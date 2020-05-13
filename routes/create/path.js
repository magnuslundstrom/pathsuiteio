const moment = require('moment')
const Path = require('../../models/Path')
const auth = require('../../middleware/auth')

module.exports = (router) => {
  // @@ Used to create a new path
  router.post('/api/create-path', auth, async (req, res) => {
    const path = new Path({
      ...req.body,
      deadline: req.body.deadline,
      company: req.user.company._id,
    })
    await path.save()
    console.log(moment(path.deadline).format('MMM Do YY'))
    console.log(path.deadline)
    res.send(path)
  })
}

/*
req.body consist of:
title,
category,
user,
responsible,
[goals],
*/
