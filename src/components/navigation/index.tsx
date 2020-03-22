import clsx from 'clsx'
import { debounce } from 'lodash'
import React, { Component, createContext, Fragment } from 'react'
import styled, { css, withTheme } from 'styled-components'

import { animations as DrawerAnimations, Drawer } from './drawer'
import { Header } from './header'
import { Action, ActionTypes, NavigationStates, NavigationTypes, Props, State } from './index.interface'
import { CastEvent } from '@interfaces/event.interface'
import { StateUtils } from '@utils/state.utils'

export const Context = createContext<Partial<State>>({})
export const { Consumer, Provider } = Context

@(withTheme as any)
export class Navigation extends Component<Props, Partial<State>> {
  static defaultProps: Props = {
    header: {
      transperent: false
    },
    narrow: false,
    navigation: {
      type: NavigationTypes.menu,
      collapsable: true
    }
  }

  public state: Partial<State>= {
    navigation: {
      type: NavigationTypes.off
    },
    ...StateUtils.bind(this)()
  }

  private watchResize = debounce(this.handleResize.bind(this), 100, { leading: true })

  public reducer (state: Partial<State>, action: Action) {
    if (action.type === ActionTypes['navigation:close']) {
      // navigation close action
      state = { navigation: { state: NavigationStates.close } }

    } else if (action.type === ActionTypes['navigation:open']) {
      // set state
      state = { navigation: { state: NavigationStates.open } }

    } else if (action.type === ActionTypes['navigation:toggle']) {
      if ([ NavigationStates.overlay, NavigationStates.open, NavigationStates.collapse ].includes(this.state.navigation.state)) {
        state = { navigation: { state: NavigationStates.close } }

      } else {
        state = { navigation: { state: NavigationStates.open } }

      }

    } else if (action.type === ActionTypes['navigation:mouseEnter']) {
      state = { navigation: { state: NavigationStates.open, mouse: true } }

    } else if (action.type === ActionTypes['navigation:mouseLeave']) {
      state = { navigation: { mouse: false } }

    }

    return state
  }

  public componentDidMount () {
    // set easier logical operations
    this.state.write({ navigation: { type: this.props.navigation.type } })

    // set cross modes
    if (this.props.narrow) {
      this.props.navigation.type = NavigationTypes.header
    }

    // add global listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.watchResize)
    }

    // set initial state for the render
    this.handleResize({ target: window })
  }

  public componentWillUnmount () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.watchResize)
    }
  }

  public componentDidUpdate () {
    // check if window is collapsable or large enought to show the navigation bar
    if (this.state.navigation.state === NavigationStates.open) {
      let navigation: NavigationStates
      // decide on state, css makes it laggy
      if (this.props.navigation.collapsable && !this.state.navigation.mouse) {
        navigation = window.innerWidth > this.props.theme.breakpoints.values.sm ? NavigationStates.collapse : NavigationStates.overlay
      } else {
        navigation = window.innerWidth > this.props.theme.breakpoints.values.sm ? NavigationStates.open : NavigationStates.overlay
      }

      // set state
      if (this.state.navigation.state !== navigation) {
        this.state.write({ navigation: { state: navigation } })
      }
    }

  }

  public render () {
    return (
      <Fragment>
        <Provider value={this.state}>
          <Header transperent={this.props.header.transperent} narrow={this.props.narrow} />
          <Drawer collapsable={this.props.navigation.collapsable} />
          <Main className={clsx(this.state.navigation.state, { narrow: this.props.narrow })}>
            {this.props.children}
            testing main
          </Main>
        </Provider>
      </Fragment>
    )
  }

  private async handleResize (e: Partial<Event>) {
    const event = e as CastEvent<Window>
    if (event.target.innerWidth < this.props.theme.breakpoints.values.sm) {
      // set navigation type to menu type for smaller screens
      this.state.write({ navigation: { type: NavigationTypes.menu } })

      // when screen gets resized to small collapse the navigation
      this.state.dispatch({ type: ActionTypes['navigation:close'] })

    } else {
      // set navigation type to prop type when resized to a larger screen
      if (this.state.navigation.type !== this.props.navigation.type) {
        await this.state.write({ navigation: { type: this.props.navigation.type } })
      }

      // if intended type is menu, open it, else close it
      if (this.state.navigation.type === NavigationTypes.menu) {
        // when screen gets resized back expand the navigation
        this.state.dispatch({ type: ActionTypes['navigation:open'] })

      } else {
        this.state.dispatch({ type: ActionTypes['navigation:close'] })

      }

    }
  }

}

const Main = styled.div(({ theme }) => css`
position: absolute;
top: ${theme.template.header.headerSizeMin};
padding-top: calc(${theme.template.header.headerSizeMin} * 0.1);
${DrawerAnimations('collapse', 'left')}

&.open {
  left: ${theme.template.navigation.width};
}

&.collapse {
  left: ${theme.template.navigation.collapseWidth};
}

&.close {
  left: 0;
}

${theme.breakpoints.up('lg')} {
  &.narrow {
    padding-left: calc((100% - ${theme.breakpoints.values.lg}px)/2);
    padding-right: calc((100% - ${theme.breakpoints.values.lg}px)/2);
  }
}
`)