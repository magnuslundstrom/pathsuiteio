import styled from 'styled-components'
import colors from '../../styles/colors'

export const FormWrapper = styled.div`
  text-align: center;
  background-color: ${colors.white};
  max-width: 800px;
  padding: 50px;
  box-shadow: 0 0.175rem 0.25rem rgba(0, 0, 0, 0.075);
  border-radius: 5px;
`

export const Title = styled.h1`
  color: ${colors.blue};
  margin-top: 0px;
  font-weight: 700;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 275px;
`

export const Input = styled.input`
  border: 0px;
  padding: 10px;
  margin-top: 15px;
  max-width: 300px;
  border: 2px solid ${colors.gray};
  border-radius: 5px;
  width: 100%;
  ::placeholder {
    color: #a9a9a9;
  }
  :focus {
    outline: ${colors.green} solid 1px;
    border-radius: 5px;
  }
`

export const Button = styled.button`
  background-color: ${colors.green};
  border: 0px;
  width: 100%;
  color: ${colors.white};
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  :hover {
    cursor: pointer;
    background-color: ${colors.secGreen};
  }
  &:disabled {
    background-color: ${colors.secGreen};
  }
`

export const GrayBg = styled.div`
  height: 100vh;
  padding-top: 100px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.gray};
`
