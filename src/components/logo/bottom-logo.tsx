import { Grid } from '@material-ui/core'
import React, { Component, Fragment } from 'react'
import styled, { css } from 'styled-components'

import { name, version } from '../../../package.json'

export class BottomLogo extends Component {
  render () {
    return (
      <Fragment>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <Logo>
                <img src="/imgs/logo/logo.svg" alt="kilic.dev" />
              </Logo>
            </Grid>
            <Grid item className="font-w300">
              {name}
            </Grid>
          </Grid>
          <Grid item className="text-muted">
            <small>v{version}</small>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

const Logo = styled.div(({ theme }) => css`
  width: ${theme.typography.fontSize}px;
  margin-right: 5px;
  margin-bottom: -5px;
`)