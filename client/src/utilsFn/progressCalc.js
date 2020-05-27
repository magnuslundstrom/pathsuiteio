// Calculates the progess based on how many subtasks is deleted
export default (subtasks) => {
  const completed = subtasks.filter((subtask) => subtask.isCompleted)
  return (completed.length / subtasks.length) * 100
}
