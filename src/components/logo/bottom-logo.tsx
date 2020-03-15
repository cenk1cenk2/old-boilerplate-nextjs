import { faTerminal } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid } from '@material-ui/core'
import React, { Component, Fragment } from 'react'

import { name, version } from '../../../package.json'

export class BottomLogo extends Component {
  render () {
    return (
      <Fragment>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item className="text-logo push-5-r">
              <FontAwesomeIcon icon={faTerminal} />
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
