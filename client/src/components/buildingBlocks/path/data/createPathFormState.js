// Represents the initial state object if edit is false
export const createPathFormState = {
  form: {
    pathTitle: '',
    user: '',
    responsible: '',
    category: '',
    startDate: null,
    endDate: null,
    goal: '',
    subtasks: [
      {
        subtaskTitle: '',
        subtaskType: '',
        subtaskLink: '',
        subtaskNote: '',
      },
    ],
  },
}
