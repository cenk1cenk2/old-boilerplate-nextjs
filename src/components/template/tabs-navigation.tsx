import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tabs, Tab } from '@material-ui/core'
import { withRouter, NextRouter } from 'next/router'
import { Component, Fragment } from 'react'

import { NavigationItems } from './index.interface'

interface Props {
  items?: NavigationItems[]
  router?: NextRouter
}

@(withRouter as any)
export class TabsNavigation extends Component<Props> {

  public render () {
    return (
      <Fragment>
        <Tabs
          value={this.props.router.pathname}
          indicatorColor="secondary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {
            this.props.items?.map((item) => {
              return (<Tab label={item.name} icon={<FontAwesomeIcon icon={item.icon} />} value={item.url} key={item.url} />)
            })
          }
        </Tabs>
      </Fragment>
    )
  }

}