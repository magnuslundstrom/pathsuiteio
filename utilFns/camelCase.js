module.exports = (str) => {
  const newStr = str.toLowerCase()
  return newStr.replace(newStr[0], str[0].toUpperCase())
}
