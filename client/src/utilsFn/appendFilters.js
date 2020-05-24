export default (obj) => {
  let string = ''
  for (const prop in obj) {
    if (obj[prop] !== '') string += `&${prop}=${obj[prop]}`
  }
  return string
}
