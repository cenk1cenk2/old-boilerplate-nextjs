import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppBar as BaseAppBar, Grid, Toolbar as BaseToolbar, Button, Hidden } from '@material-ui/core'
import clsx from 'clsx'
import { debounce } from 'lodash'
import { Component, Fragment } from 'react'
import styled, { DefaultTheme, withTheme, css } from 'styled-components'

import { Consumer } from './index'
import { ActionTypes, NavigationTypes } from './index.interface'
import { CastEvent } from '@interfaces/event.interface'
import { project } from '@interfaces/project.constants'

export interface Props {
  transperent?: boolean
  narrow?: boolean
  theme?: DefaultTheme
}

export interface State {
  headerSolid: boolean
}

@(withTheme as any)
export class Header extends Component<Props, State> {
  static defaultProps: Props = {
    transperent: true,
    narrow: true
  }

  static state: State = {
    headerSolid: false
  }

  private watchScroll = debounce(this.handleScroll.bind(this), 100, { leading: true })

  public componentDidMount () {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.watchScroll)
    }
  }

  public componentWillUnmount () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.watchScroll)
    }
  }

  public render () {
    return (
      <Fragment>
        <AppBar position="fixed" color="transparent" className={clsx({ 'reset-shadow': this.props.transperent && !this.state?.headerSolid })}>
          <Toolbar className={clsx({ 'transperent-toolbar': this.props.transperent && !this.state?.headerSolid, 'narrow-toolbar': this.props.narrow })}>
            <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
              <Grid item className="logoField">
                <a href="/" className="subtle">
                  <Grid container direction="row" alignItems="center">
                    <Logo>
                      <img src="/imgs/logo/logo.svg" alt={project.title} />
                    </Logo>
                    <Title>{project.title}</Title>
                  </Grid>
                </a>
              </Grid>
              <Grid item>
                <Consumer>
                  {(context) => {
                    if (context.navigation?.type === NavigationTypes.menu) {
                      return (
                        <Hidden smUp>
                          <Button variant="outlined" onClick={() => { context.dispatch({ type: ActionTypes['navigation:toggle'] }) }}><FontAwesomeIcon icon={faBars} /></Button>
                        </Hidden>
                      )
                    }
                  }}
                </Consumer>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Fragment>
    )
  }

  private handleScroll (e: Event) {
    const event = e as CastEvent<Window>
    if (event.target.pageYOffset > 50) {
      this.setState({ headerSolid: true })
    } else {
      this.setState({ headerSolid: false })
    }
  }
}

const AppBar = styled(BaseAppBar)(({ theme }) => css`
// ${theme.breakpoints.up('sm')} {
//   .MuiToolbar-gutters {
//       padding-left: 30px;
//       padding-right: 30px;
//   }
// }

// .MuiToolbar-gutters {
//     padding-left: 20px;
//     padding-right: 20px;
// }

.transperent-toolbar {
  background-color: transparent;
}

.MuiPaper-root {
  background-color: ${theme.template.body[2]};
}

.narrow-toolbar {
  ${theme.breakpoints.up('lg')} {
    &.MuiToolbar-gutters {
      padding-left: calc((100% - ${theme.breakpoints.values.lg}px)/2);
      padding-right: calc((100% - ${theme.breakpoints.values.lg}px)/2);
    }
  }
}
`)

const Toolbar = styled(BaseToolbar)(({ theme })=> css`
${animations('headerTransperency', 'background-color')}

${theme.breakpoints.up('xs')} {
  &.logoField {
    min-width: ${theme.template.header.logoFieldWidth};
  }
}
`)

const Title = styled.div(({ theme }) => css`
  font-family: ${theme.text.font.heading.name};
  font-size: 28px;
  font-weight: 700;
  line-height: 0;
`)

const Logo = styled.div(({ theme }) => css`
  width: 28px;
  margin-right: 5px;

  img {
    display: inline-block;
  }
`)

type AnimationTypes = 'headerTransperency'

export function animations (type: AnimationTypes, property) {
  const o = {
    headerTransperency: css`transition: ${property} 0.5s ease-in-out;`
  }
  return o[type]
}