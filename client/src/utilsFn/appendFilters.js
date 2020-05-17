export default (filterArr) => {
  let filterString = ''
  filterArr.forEach((filter) => {
    const key = Object.keys(filter)[0]
    if (filter[key] === '') filterString += ''
    else filterString += `&${key}=${filter[key]}`
  })
  return filterString
}
