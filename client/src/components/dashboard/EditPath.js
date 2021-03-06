import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ScreenLoader from '../buildingBlocks/utils/ScreenLoader'
import Container from '../buildingBlocks/Container'
import PathForm from '../buildingBlocks/path/PathForm'

// Represents "/edit-path"

const CreatePath = (props) => {
  const [editPathState, setEditPathState] = useState('')
  const [loading, setLoading] = useState(true)
  const params = new URLSearchParams(props.location.search)
  const [pathId] = useState(params.get('id'))

  // submits data to server
  const onSubmit = async (stateobj) => {
    try {
      const res = await axios.patch(`/api/update-path?id=${pathId}`, {
        ...stateobj,
      })
      if (res) props.history.goBack()
    } catch (e) {}
  }

  // Delete path
  const onDelete = async () => {
    try {
      const res = await axios.get(`/api/delete-path?id=${pathId}`)
      if (res) props.history.goBack()
    } catch (e) {}
  }

  // onload fetch path data
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
      setLoading(false)
    }
    getData()
  }, [props.location.search, pathId])

  return (
    <Container>
      <h1>Edit path</h1>

      <button className='block mt-8 font-semibold hover-underline' onClick={() => props.history.goBack()}>
        <i className='fas fa-arrow-left mr-2'></i> Go back{' '}
      </button>
      <button className='mt-2 font-semibold mb-5 hover-underline' onClick={() => onDelete()}>
        <i className='fas fa-trash-alt mr-2'></i> Discard path
      </button>
      {loading ? <ScreenLoader /> : editPathState && <PathForm edit={true} onSubmit={onSubmit} state={editPathState} />}
    </Container>
  )
}

export default CreatePath
