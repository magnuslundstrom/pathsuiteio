const moment = require('moment')

module.exports = (arr) => {
  const lastWeekNumber = moment(new Date(), 'MM-DD-YYYY').week() - 1
  const lastWeekNotifications = []
  const companyGoalNotifications = arr

  // if noti.date.week is === lastWeekNumber -> push into lastWeekNotifications
  companyGoalNotifications.forEach((noti) => {
    if (moment(noti.date, 'MM-DD-YYYY').week() === lastWeekNumber) lastWeekNotifications.push(noti)
  })
  // Represents the week days in numbers
  const days = [0, 1, 2, 3, 4, 5, 6]
  daysObj = {}
  // sets each number as a key in our daysObj. 0 is default number of appearances
  days.forEach((day) => (daysObj[day] = 0))
  // does ++ on daysObj[day] each time dayOfWeek is represented
  lastWeekNotifications.forEach((noti) => {
    const dayOfWeek = moment(noti.date).day()
    daysObj[dayOfWeek]++
  })
  return Object.values(daysObj)
}
