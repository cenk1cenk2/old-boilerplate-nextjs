import Head from 'next/head'
import { Component, Fragment } from 'react'

import { Navigation } from '@components/navigation'

export default class FrontendTemplate extends Component {

  render () {
    return (
      <Fragment>
        <Head>
          <title>Frontend Page Title</title>
        </Head>
        <Navigation>
          test
        </Navigation>

      </Fragment>
    )
  }
}
