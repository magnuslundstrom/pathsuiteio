const moment = require('moment')

// Used to find the number of tasks completed "last year"
module.exports = (arr, when) => {
  let bonus
  if (when === 'this-year') bonus = 0
  if (when === 'last-year') bonus = -1
  const yearNumber = moment(new Date(), 'MM-DD-YYYY').year() + bonus
  const yearNotifications = []
  const companyGoalNotifications = arr

  // if noti.date.year is === yearNumber -> push into yearNotifications
  companyGoalNotifications.forEach((noti) => {
    if (moment(noti.date, 'MM-DD-YYYY').year() === yearNumber) yearNotifications.push(noti)
  })
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  monthsObj = {}
  // // sets each number as a key in our monthsObj. 0 is default number of appearances
  months.forEach((month) => (monthsObj[month] = 0))
  // does ++ on monthsObj[month] each time monthOfYear is represented
  yearNotifications.forEach((noti) => {
    const monthOfYear = moment(noti.date).month()
    monthsObj[monthOfYear]++
  })
  return Object.values(monthsObj)
}
