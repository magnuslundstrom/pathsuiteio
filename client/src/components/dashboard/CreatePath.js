import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Container from '../buildingBlocks/Container'
import PathForm from '../buildingBlocks/path/PathForm'
import { createPathFormState } from '../buildingBlocks/path/data/createPathFormState' // has a clean obj that holds all data to be send to api endpoint

const CreatePath = (props) => {
  const [state, setState] = useState({ obj: {}, loading: true })

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

  // FIX - subtasks bliver ikke resat, så har gjort det således
  useEffect(() => {
    setState({
      obj: {
        ...createPathFormState,
        form: {
          ...createPathFormState.form,
          subtasks: [{ subtaskTitle: '', subtaskLink: '', subtaskNote: '', subtaskType: '' }],
        },
      },
      loading: false,
    })
  }, [])

  console.log(state.obj)

  return (
    <Container>
      <h1>New path</h1>
      <button className="mt-8 font-semibold mb-5" onClick={() => props.history.goBack()}>
        <i className="fas fa-trash-alt mr-2"></i> Discard path
      </button>
      {!state.loading && <PathForm edit={false} onSubmit={onSubmit} state={state.obj} />}
    </Container>
  )
}

export default CreatePath
