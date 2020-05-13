export const insertNewSubtask = () => {
  const subtask = {
    subtaskTitle: '',
    subtaskType: '',
    subtaskLink: '',
    subtaskNote: '',
  }
  return subtask
}

export const removeSubtask = (arr, index) => {
  const newSubtaskArr = arr.splice(index, 1)
  return newSubtaskArr
}
