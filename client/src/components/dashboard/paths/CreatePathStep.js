import React from 'react'
import styled from 'styled-components'


const CreatePathStep = (props) => {

    return (
        <div dataNumber={props.number}>
        <h2>Goal</h2>
        <p>Add goal</p>
        <div>{props.number}. <input type="text" placeholder="Add title for the learning goal" /></div>
        <div>RI <input type="text" placeholder="Add type" /></div>
        <div>RI <input type="text" placeholder="Add link" /></div>
        <div>RI <input type="text" placeholder="Note" /></div>
        </div>
    )
}

export default CreatePathStep