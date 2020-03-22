import { DefaultTheme } from 'styled-components'

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

export interface State {
  navigation: {
    enabled?: boolean
    state?: NavigationStates
  }
  dispatch: (action: Action) => void
  write: (state: Partial<State>) => void
}

export enum NavigationStates {
  open = 'open',
  overlay = 'overlay',
  close = 'close',
  collapse = 'collapse'
}

export enum NavigationTypes {
  header,
  menu,
  off
}

export interface Action {
  type: ActionTypes
  payload?: any
}

export enum ActionTypes {
  'navigation:toggle',
  'navigation:open',
  'navigation:close'
}