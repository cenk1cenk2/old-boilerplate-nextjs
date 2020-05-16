import Head from 'next/head'
import { Fragment, FunctionComponent } from 'react'

export const Root: FunctionComponent<any> = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Empty Page Title</title>
      </Head>
    </Fragment>
  )
}

export default Root