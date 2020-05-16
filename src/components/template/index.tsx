import clsx from 'clsx'
import { debounce } from 'lodash'
import React, { Component, createContext, Fragment } from 'react'
import styled, { css, withTheme } from 'styled-components'

import { Header } from './header'
import { Action, ActionTypes, NavigationStates, NavigationTypes, TemplateProps, State } from './index.interface'
import { projectDetails } from '@interfaces/project.constants'
import { animations as DrawerAnimations, DrawerNavigation } from '@src/components/template/drawer-navigation'
import { CastEvent } from '@src/interfaces/event.interface'
import { StateUtils } from '@src/utils/state.utils'

export const Context = createContext<Partial<State>>({})
export const { Consumer, Provider } = Context

@(withTheme as any)
export class Template extends Component<TemplateProps, Partial<State>> {
  static defaultProps: TemplateProps = {
    header: {
      transperent: true
    },
    narrow: true,
    navigation: {
      type: NavigationTypes.header,
      collapsable: true
    },
    project: projectDetails
  }

  public state: Partial<State>= {
    narrow: false,
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
    this.state.write({
      navigation: { type: this.props.navigation.type }, narrow: this.props.narrow, header: this.props.header
    })
    this.state.write({ narrow: this.props.narrow })

    // set cross modes
    if (this.props.navigation.type === NavigationTypes.menu) {
      this.state.write({ narrow: false, header: { transperent: false } })
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
        navigation = window.innerWidth > this.props.theme.breakpoints.values.md ? NavigationStates.collapse : NavigationStates.overlay
      } else {
        navigation = window.innerWidth > this.props.theme.breakpoints.values.md ? NavigationStates.open : NavigationStates.overlay
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
          <Header transperent={this.state.header?.transperent} narrow={this.state.narrow} project={this.props.project} />
          <DrawerNavigation collapsable={this.props.navigation.collapsable} items={this.props.items} />
          <Main className={clsx(this.state.navigation.state, { narrow: this.state.narrow })}>
            {this.props.children}
          </Main>
        </Provider>
      </Fragment>
    )
  }

  private async handleResize (e: Partial<Event>) {
    const event = e as CastEvent<Window>
    if (event.target.innerWidth < this.props.theme.breakpoints.values.md) {
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

padding: ${theme.spacing(1)}px;

${theme.breakpoints.up('lg')} {
  &.narrow {
    padding-left: calc((100% - ${theme.breakpoints.values.lg}px)/2);
    padding-right: calc((100% - ${theme.breakpoints.values.lg}px)/2);
  }
}
`)