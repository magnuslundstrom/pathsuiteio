import React from 'react'
import axios from 'axios'

import Container from '../buildingBlocks/Container'
import PathForm from '../buildingBlocks/path/PathForm'
import { createPathFormState } from '../buildingBlocks/path/data/createPathFormState' // has a clean obj that holds all data to be send to api endpoint

const CreatePath = (props) => {
  const onSubmit = async (stateobj) => {
    try {
      const res = await axios.post('/api/create-path', {
        ...stateobj,
      })
      console.log(res)
      if (res) props.history.goBack()
    } catch (e) {
      console.log(e.response)
    }
  }

  return (
    <Container>
      <h1>New path</h1>
      <button className="mt-8 font-semibold mb-5" onClick={() => props.history.goBack()}>
        <i className="fas fa-trash-alt mr-2"></i> Discard path
      </button>
      <PathForm edit={false} onSubmit={onSubmit} state={createPathFormState} />
    </Container>
  )
}

export default CreatePath
