export default (arr) => {
  let currentHighestNumber = 0
  arr.forEach((number) => {
    if (number > currentHighestNumber) currentHighestNumber = number
  })
  return currentHighestNumber
}
