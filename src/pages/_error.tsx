import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid } from '@material-ui/core'
import NextError from 'next/error'
import Router from 'next/router'
import { Fragment } from 'react'

import { Pulldown } from '../components/pulldown/pulldown'
import { ITheme } from '@interfaces/styles.interface'

export default class Error extends NextError<ITheme> {

  componentDidMount () {
    Router.push('/')
  }

  render () {
    return (
      <Fragment>
        <Pulldown>
          <Grid container direction="column" alignItems="center" alignContent="center" spacing={1} className="push-20-t push-20">
            <Grid item>
              <h1 className="text-error">
                <FontAwesomeIcon icon={faArrowLeft} />
              </h1>
            </Grid>
            <Grid item>
              <h4 className="text-muted">Nothing to see here, redirecting...</h4>
            </Grid>
          </Grid>
        </Pulldown>
      </Fragment>
    )
  }

}
