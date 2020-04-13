import styled from 'styled-components'
import colors from '../../styles/colors'

// @ AUTH BUTTON
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
// @ CREATE PATH BUTTON
export const CreatePathButton = styled.button`
  display: flex;
  margin-left: auto;
  background-color: ${colors.green};
  border: 0px;
  color: ${colors.white};
  padding: 10px 50px;
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

export const TransparentButton = styled.button`
  background: transparent;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  border: 0px;
`
