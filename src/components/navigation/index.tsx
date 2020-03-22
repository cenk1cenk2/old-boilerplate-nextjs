import clsx from 'clsx'
import { debounce } from 'lodash'
import { Component, createContext, Fragment } from 'react'
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
      enabled: false
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

      if ([ NavigationStates.overlay, NavigationStates.open, NavigationStates.collapse ].indexOf(this.state.navigation.state) > 0) {
        state = { navigation: { state: NavigationStates.close } }

      } else {
        state = { navigation: { state: NavigationStates.open } }

      }

    }

    return state
  }

  public componentDidMount () {
    // add listeners
    if (typeof window !== 'undefined') {
      if (this.props.navigation.type === NavigationTypes.menu) {
        window.addEventListener('resize', this.watchResize)
      }
    }

    // set cross modes
    if (!this.props.narrow) {
      // navigation is not allowed in narrow mode
      this.state.write({ navigation: { enabled: true } })
    }

    // set window navigation menu, not allowed in narrow mode to show
    if (this.state.navigation.enabled && window.innerWidth > this.props.theme.breakpoints.values.sm) {
      this.state.dispatch({ type: ActionTypes['navigation:open'] })
    } else {
      this.state.dispatch({ type: ActionTypes['navigation:close'] })
    }
  }

  public componentWillUnmount () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.watchResize)
    }
  }

  public componentDidUpdate () {
    console.log(this.state)
    // check if window is collapsable or large enought to show the navigation bar
    if (this.state.navigation.enabled && this.state.navigation.state === NavigationStates.open) {
      let navigation: NavigationStates
      // decide on state, css makes it laggy
      if (this.props.navigation.collapsable) {
        navigation = window.innerWidth > this.props.theme.breakpoints.values.sm ? NavigationStates.collapse : NavigationStates.overlay
      } else {
        navigation = window.innerWidth > this.props.theme.breakpoints.values.sm ? NavigationStates.open : NavigationStates.overlay
      }

      // set state
      this.state.write({ navigation: { state: navigation } })
    }

  }

  public render () {
    return (
      <Fragment>
        <Provider value={this.state}>
          <Header transperent={this.props.header.transperent} narrow={this.props.narrow} />
          <Drawer show={!this.props.narrow} />
          <Main className={clsx({ narrow: this.props.narrow })}>
            {this.props.children}
            testing main
          </Main>
        </Provider>
      </Fragment>
    )
  }

  private handleResize (e: Event) {
    const event = e as CastEvent<Window>
    if (event.target.innerWidth < this.props.theme.breakpoints.values.sm) {
      // when screen gets resized collapse the navigation
      this.state.dispatch({ type: ActionTypes['navigation:close'] })

    } else {
      // when screen gets resized back expand the navigation
      this.state.dispatch({ type: ActionTypes['navigation:open'] })

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