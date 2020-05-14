import React from 'react'
import axios from 'axios'

import Container from '../buildingBlocks/Container'
import PathForm from '../buildingBlocks/path/PathForm'

const CreatePath = (props) => {
  // GET STATE FROM PATHFORM
  const onSubmit = async (stateobj) => {
    console.log({ ...stateobj })
    try {
      const res = await axios.post('/api/create-path', {
        ...stateobj,
      })
      console.log(res.data)
      // props.history.goBack()
    } catch (e) {
      console.log(e.response)
    }
  }

  return (
    <Container>
      <h1>New path</h1>
      <button className="mt-5 font-semibold mb-5" onClick={() => props.history.goBack()}>
        <i className="fas fa-trash-alt mr-2"></i> Discard path
      </button>
      <PathForm edit={false} onSubmit={onSubmit} />
    </Container>
  )
}

export default CreatePath
