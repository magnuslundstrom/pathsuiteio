import styled from 'styled-components'
import colors from '../../styles/colors'

export const HeaderWrapper = styled.div`
  background-color: ${colors.gray};
  padding: 30px 50px;
  display: flex;
  justify-content: space-between;

  a {
    margin-left: 30px;
  }

  .dropdown {
    display: inline;
    margin-left: 30px;
  }
`
