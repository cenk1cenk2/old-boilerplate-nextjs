import { Drawer as BaseDrawer } from '@material-ui/core'
import clsx from 'clsx'
import { TransitionProperty } from 'csstype'
import React, { Component, Fragment } from 'react'
import styled, { DefaultTheme, withTheme, css } from 'styled-components'

import { Consumer, Context } from './index'

export interface Props {
  theme?: DefaultTheme
  items?: any
  show: boolean
}

@(withTheme as any)
export class Drawer extends Component<Props> {

  static defaultProps = {
    items: null,
    show: false
  }

  render ( ) {
    return (
      <Fragment>
        <Consumer>
          {(context) => (
            <Menu anchor="left" open={context.navigation?.enabled} variant="permanent" className={clsx(context.navigation?.state)}>
              asdsadsada
            </Menu>
          )}
        </Consumer>
      </Fragment>
    )
  }
}

const Menu = styled(BaseDrawer)(({ theme }) => css`
.MuiPaper-root {
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