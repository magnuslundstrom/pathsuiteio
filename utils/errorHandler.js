module.exports = (e) => {
  const keys = Object.keys(e.errors)
  const newErrors = {}
  keys.forEach((el) => {
    newErrors[el] = e.errors[el].message
  })
  return newErrors
}
