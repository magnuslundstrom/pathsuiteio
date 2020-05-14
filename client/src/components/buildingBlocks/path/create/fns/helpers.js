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
  const newArr = [...arr]
  newArr.splice(index, 1)
  return newArr
}
