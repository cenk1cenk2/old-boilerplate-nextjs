import { Theme } from '@material-ui/core/styles'
import { ColorProperty } from 'csstype'

import { ITextConfig } from './text.interface'

export interface ITheme extends Theme {
  colors: {
    primary: ColorProperty
    secondary: ColorProperty
    success: ColorProperty
    warning: ColorProperty
    error: ColorProperty
    text: ColorProperty
  }

  text: ITextConfig

  template: {
    body: {
      0: ColorProperty
      1: ColorProperty
      2: ColorProperty
    }
  }
}
