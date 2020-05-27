// takes in state obj and returns a string with the keys=value

export default (obj) => {
  let string = ''
  for (const prop in obj) {
    if (obj[prop] !== '') string += `&${prop}=${obj[prop]}`
  }
  return string
}
