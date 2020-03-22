import { Drawer as BaseDrawer } from '@material-ui/core'
import clsx from 'clsx'
import { debounce } from 'lodash'
import React, { Component, Fragment, useContext } from 'react'
import styled, { css, DefaultTheme, withTheme } from 'styled-components'

import { Consumer } from './index'
import { NavigationTypes, State as Context, NavigationStates, ActionTypes } from './index.interface'

export interface Props {
  theme?: DefaultTheme
  items?: any
  collapsable?: boolean
}

@(withTheme as any)
export class Drawer extends Component<Props> {

  static defaultProps = {
    items: null,
    collapsable: false
  }

  private watchMouseEnter = debounce(this.handleMouseEnter.bind(this), 100, { leading: true })
  private watchMouseLeave = debounce(this.handleMouseLeave.bind(this), 100, { leading: true })

  public render ( ) {
    return (
      <Fragment>
        <Consumer>
          {(context) => (
            <Menu
              anchor="left" open={context.navigation?.type === NavigationTypes.menu}
              variant="permanent" className={clsx(context.navigation?.state)}
              onMouseEnter={() => this.watchMouseEnter(context)}
              onMouseLeave={() => this.watchMouseLeave(context)}
            >
              asdsadsada
            </Menu>
          )}
        </Consumer>
      </Fragment>
    )
  }

  private handleMouseEnter (context: Partial<Context>) {
    if (context.navigation.state === NavigationStates.collapse) {
      context.dispatch({ type: ActionTypes['navigation:mouseEnter'] })
    }
  }

  private handleMouseLeave (context: Partial<Context>) {
    if ([ NavigationStates.collapse, NavigationStates.open ].includes(context.navigation.state)) {
      context.dispatch({ type: ActionTypes['navigation:mouseLeave'] })
    }
  }
}

const Menu = styled(BaseDrawer)(({ theme }) => css`
.MuiPaper-root {
  width: 0;
  z-index: 1050;
  top: ${theme.template.header.headerSizeMin};
  padding-top: calc(${theme.template.header.headerSizeMin} * 0.1);
  white-space: nowrap;
  overflow: hidden;
  ${animations('collapse', 'width')}

  .open& {
    width: ${theme.template.navigation.width};
  }

  .overlay& {
    width: 100%;
  }

  .collapse& {
    width: ${theme.template.navigation.collapseWidth};
  }

  .close& {
    width: 0;
  }
}

.MuiDrawer-paperAnchorDockedLeft {
  border-right: 0;
}

.MuiDrawer-paperAnchorDockedRight {
  border-left: 0;
}
`)

type AnimationTypes = 'collapse'

export function animations (type: AnimationTypes, property) {
  const o = {
    collapse: css`transition: ${property} 0.4s ease-in-out;`
  }
  return o[type]
}