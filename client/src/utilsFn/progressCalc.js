export default (steps) => {
  const completed = steps.filter((step) => step.isCompleted)
  return (completed.length / steps.length) * 100
}
