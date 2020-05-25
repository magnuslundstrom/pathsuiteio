// Represents the initial state object if !props.edit
// used to shorten down lines of code in PathForm.js
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
