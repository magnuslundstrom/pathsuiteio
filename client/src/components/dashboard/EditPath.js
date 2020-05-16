import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Container from '../buildingBlocks/Container'
import PathForm from '../buildingBlocks/path/PathForm'

const CreatePath = (props) => {
  const [editPathState, setEditPathState] = useState('')

  const params = new URLSearchParams(props.location.search)

  const [pathId] = useState(params.get('id'))

  const onSubmit = async (stateobj) => {
    try {
      const res = await axios.patch(`/api/update-path?id=${pathId}`, {
        ...stateobj,
      })
      console.log(res)
      if (res) props.history.goBack()
    } catch (e) {
      console.log(e.response)
    }
  }

  const onDelete = async () => {
    try {
      const res = await axios.get(`/api/delete-path?id=${pathId}`)
      if (res) props.history.goBack()
    } catch (e) {
      console.log(e.response)
    }
  }

  useEffect(() => {
    const getData = async () => {
      const { data: path } = await axios.get(`/api/single-edit-path?id=${pathId}`)
      const startDate = new Date(path.startDate)
      const endDate = new Date(path.endDate)
      setEditPathState({
        form: { ...path, startDate, endDate, user: path.user._id, responsible: path.user._id },
        userName: `${path.user.firstName} ${path.user.lastName}`,
        responsibleName: `${path.responsible.firstName} ${path.responsible.lastName}`,
      })
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <h1>Edit path</h1>
      <button className='mt-8 font-semibold mb-5' onClick={() => onDelete()}>
        <i className='fas fa-trash-alt mr-2'></i> Discard path
      </button>
      {editPathState && <PathForm edit={true} onSubmit={onSubmit} state={editPathState} />}
    </Container>
  )
}

export default CreatePath
