// used to calculate the highest number in chart components

export default (arr) => {
  let currentHighestNumber = 0
  arr.forEach((number) => {
    if (number > currentHighestNumber) currentHighestNumber = number
  })
  return currentHighestNumber
}
