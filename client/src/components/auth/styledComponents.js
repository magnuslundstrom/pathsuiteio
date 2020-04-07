import styled from 'styled-components'
import colors from '../../styles/colors'

export const FormWrapper = styled.div`
  text-align: center;
  background-color: ${colors.gray};
  max-width: 800px;
  min-height: 500px;
  margin: 100px auto;
  padding: 30px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Input = styled.input`
  border: 0px;
  padding: 7.5px;
  margin-top: 10px;
  max-width: 300px;
`

export const Button = styled.button`
  background-color: ${colors.green};
  border: 0px;
  color: ${colors.white};
  padding: 5px 20px;
  margin-top: 20px;
  :hover {
    cursor: pointer;
    background-color: ${colors.secGreen};
  }
`
