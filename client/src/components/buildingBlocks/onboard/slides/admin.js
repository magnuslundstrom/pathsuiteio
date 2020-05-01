import stepOneImage from '../../../../images/onboard/welcome.png'
import stepTwoImage from '../../../../images/onboard/create-employees.png'
import stepThreeImage from '../../../../images/onboard/learning-paths.png'
import stepFourImage from '../../../../images/onboard/complete-goals.png'
import stepFiveImage from '../../../../images/onboard/edit-profile.png'
import stepSixImage from '../../../../images/onboard/edit-company.png'
import stepSevenImage from '../../../../images/onboard/upgrade-subscription.png'

// Represents the data and visualises as welcome slides for an admin

export default [
  {
    // Slide one
    image: stepOneImage,
    title: 'Welcome to Pathsuite!',
    description:
      'We are happy to have you onboard! Dive into the app by following along in this small introduction!',
  },
  // Slide two
  {
    image: stepTwoImage,
    title: 'Create employees',
    description:
      'Create your first employees. In the Employee module you can create your first employees and get an overview of their learning paths.',
  },
  // Slide three
  {
    image: stepThreeImage,
    title: 'Create learning paths',
    description:
      'Create paths to your employees. In the Learning paths module you can add learning paths. Each path contains subtasks. You can always edit or delete a path.',
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
    image: stepSevenImage,
    title: 'Edit your profile',
    description:
      'Your profile contains your personal information. Add a profile photo, edit your e-mail, current position, password & view profile connections.',
  },
  // Slide six
  {
    image: stepSixImage,
    title: 'Edit company info',
    description:
      'You can add or remove admins, change billing info, view subscription and edit basic information in the company module.',
  },
  // Slide seven
  {
    image: stepFiveImage,
    title: 'Upgrade subscription',
    description:
      'Upgrade your subscription from the menu or from the company module. With an upgrade you can add more learning paths and employees.',
  },
]
