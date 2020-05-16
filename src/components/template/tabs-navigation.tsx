import { Tabs, Tab } from '@material-ui/core'
import { Component, Fragment } from 'react'

import { NavigationItems } from './index.interface'

interface Props {
  items?: NavigationItems[]
}

export class TabsNavigation extends Component<Props> {

  public render () {
    return (
      <Fragment>
        <Tabs
          value={1}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Five" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
        </Tabs>
      </Fragment>
    )
  }

}