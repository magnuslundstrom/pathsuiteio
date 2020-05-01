import stepOneImage from '../../../../images/onboard/welcome.png'
import stepTwoImage from '../../../../images/onboard/edit-profile.png'
import stepThreeImage from '../../../../images/onboard/learning-paths.png'
import stepFourImage from '../../../../images/onboard/complete-goals.png'
import stepFiveImage from '../../../../images/onboard/progress.png'

// Represents the data and visualises as welcome slides for an employee

export default [
  {
    // Slide one
    image: stepOneImage,
    title: 'Welcome to Pathsuite!',
    description:
      'We are happy to have you onboard! If you want to get familiar with the functions within the Pathsuite we will recommend you to follow the onboarding path right here.',
  },
  // Slide two
  {
    image: stepTwoImage,
    title: 'Edit your profile',
    description:
      'Your profile contains your personal information. Add a profile photo, edit your e-mail, current position, password & view profile connections.',
  },
  // Slide three
  {
    image: stepThreeImage,
    title: 'Learning paths',
    description:
      'In the learning path module you can add & edit your paths. Each path contains subtasks. All subtasks have to be finished before the path is finished.',
  },
  // Slide four
  {
    image: stepFourImage,
    title: 'Subtasks',
    description:
      'A learning path contains subtasks. A subtask can be a course, a book or something else. To complete a learning path all subtasks have to be completed.',
  },
  // Slide five
  {
    image: stepFiveImage,
    title: 'View your progress',
    description:
      'Follow your progress & performance on the dashboard. On the dashboard you can also get an overview of your current learning paths.',
  },
]
