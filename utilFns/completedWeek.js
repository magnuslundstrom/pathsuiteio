const moment = require('moment')

// Used to find the number of tasks completed "last week"
module.exports = (arr, when) => {
  let bonus
  if (when === 'this-week') bonus = 0
  if (when === 'last-week') bonus = -1
  const weekNumber = moment(new Date(), 'MM-DD-YYYY').week() + bonus
  const weekNotifications = []
  const companyGoalNotifications = arr

  // if noti.date.week is === weekNumber -> push into weekNotifications
  companyGoalNotifications.forEach((noti) => {
    if (moment(noti.date, 'MM-DD-YYYY').week() === weekNumber) weekNotifications.push(noti)
  })
  const days = [0, 1, 2, 3, 4, 5, 6]
  daysObj = {}
  // // sets each number as a key in our daysObj. 0 is default number of appearances
  days.forEach((day) => (daysObj[day] = 0))
  // does ++ on daysObj[day] each time dayOfWeek is represented
  weekNotifications.forEach((noti) => {
    const dayOfWeek = moment(noti.date).day()
    daysObj[dayOfWeek]++
  })
  return Object.values(daysObj)
}
