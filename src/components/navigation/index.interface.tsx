import { DefaultTheme } from 'styled-components'

import { StateUtilsType } from '@utils/state.utils'

export interface Props {
  header: {
    transperent?: boolean
  }
  narrow?: boolean
  navigation?: {
    collapsable?: boolean
    type: NavigationTypes
  }
  theme?: DefaultTheme
}

export interface State extends Partial<StateUtilsType<State, Action>> {
  navigation: {
    type?: NavigationTypes
    state?: NavigationStates
    mouse?: boolean
  }
}

export enum NavigationStates {
  open = 'open',
  overlay = 'overlay',
  close = 'close',
  collapse = 'collapse'
}

export enum NavigationTypes {
  header = 'header',
  menu = 'menu',
  off = 'off'
}

export interface Action {
  type: ActionTypes
  payload?: any
}

export enum ActionTypes {
  'navigation:toggle',
  'navigation:open',
  'navigation:close',
  'navigation:mouseEnter',
  'navigation:mouseLeave'
}