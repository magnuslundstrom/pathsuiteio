import React from 'react'
import {InnerContainer} from '../../styledComponents/smallComponents'
import Container from '../buildingBlocks/Container'
import CreatePathStep from './CreatePathStep'

class CreatePath extends React.Component {

    state = {
        goals: [{
            title: '',
            employees: ''
        }]
    }

render() {
    return (
        <Container>
        <h1 style={{marginTop: '50px'}}>New Path</h1>
        <InnerContainer>
        <input type="text" placeholder="Add a title" />
        <input type="text" placeholder="Pick employees" />
        <input type="text" placeholder="Who is responsible for this path?" />
    <CreatePathStep />


    <button>Add new learning goal</button>
        </InnerContainer>
        </Container>
    )
}
}

export default CreatePath