const auth = async (req, res, next) => {
  try {
    console.log(req.cookies)
  } catch (e) {
    console.log(e)
  }
}
