export default (goals) => {
  const completed = goals.filter((goal) => goal.isCompleted)
  return (completed.length / goals.length) * 100
}
