// basically used to skip the .message on the error object and standardize error messages
module.exports = (e) => {
  const keys = Object.keys(e.errors)
  const newErrors = {}

  keys.forEach((el) => {
    newErrors[el] = e.errors[el].message
  })

  return newErrors
}
