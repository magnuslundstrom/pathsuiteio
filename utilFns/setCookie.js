// sets cookie
module.exports = (res, id) => {
  return res.cookie('user', id, {
    httpOnly: true,
    expires: new Date(Date.now() + 900000),
  })
}
