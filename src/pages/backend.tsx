import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Fragment, FunctionComponent } from 'react'
import { DeepPartial } from 'ts-essentials'

import { Template } from '@components/template'
import { TemplateProps, NavigationTypes } from '@components/template/index.interface'
import { getNavigationItems } from '@hooks/getNavigationItems'

export const getStaticProps: GetStaticProps<DeepPartial<Props>> = async () => {
  return {
    props: {
      template: {
        items: await getNavigationItems()
      }
    }
  }
}

interface Props {
  template: TemplateProps
  config: any
}

export const FrontendTemplate: FunctionComponent<Props> = ({ template, config }) => {
  return (
    <Fragment>
      <Head>
        <title>Backend Page Title</title>
      </Head>
      <Template {...template} navigation={{ type: NavigationTypes.menu, collapsable: true }}>
        An empty page
      </Template>
    </Fragment>
  )
}

export default FrontendTemplate