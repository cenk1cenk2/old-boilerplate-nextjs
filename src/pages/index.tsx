import Head from 'next/head'
import { Component, Fragment } from 'react'

export default class Root extends Component {

  render () {
    return (
      <Fragment>
        <Head>
          <title>Page Title</title>
        </Head>
      </Fragment>
    )
  }
}
