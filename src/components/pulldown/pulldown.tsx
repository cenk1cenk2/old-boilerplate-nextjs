import { Box, Container, Grid } from '@material-ui/core'
import { BottomLogo } from 'components/logo/index'
import { Component, Fragment } from 'react'
import styled, { css } from 'styled-components'

const StyledGrid = styled(Grid)(({ theme }) => css`
position: absolute;
top: 0px;

${theme.breakpoints.up('sm')} {
  top: 50%;
  transform: translate(0%, -50%)
}
`)

const StyledBox = styled(Box)(({ theme }) => css`
margin: 25px 0 25px 0;
padding: 50px 0 50px 0;
background: ${theme.template.body[1]};
`)

const StyledContainer = styled(Container)`
  padding: 0;
`

export class Pulldown extends Component {
  render () {
    return (
      <Fragment>
        <StyledGrid container direction="column">
          <StyledContainer maxWidth="md">
            <StyledBox boxShadow={5}>
              {this.props?.children}
            </StyledBox>
            <BottomLogo />
          </StyledContainer>
        </StyledGrid>
      </Fragment>
    )
  }
}
