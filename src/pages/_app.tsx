import { CssBaseline, StylesProvider, ThemeProvider } from '@material-ui/core'
import NextApp from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import React, { Fragment } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { ITheme } from '@interfaces/styles.interface'
import Theme, { GlobalStyles } from '@themes/index'
import '@themes/utils.scss'

Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default class MyApp extends NextApp<ITheme> {
  componentDidMount () {
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles?.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
    const progressOverlay = document.querySelector('#page-loader')

    if (progressOverlay?.parentNode) {
      progressOverlay.parentNode.removeChild(progressOverlay)
    }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Fragment>
        <StylesProvider injectFirst>
          <ThemeProvider theme={Theme}>
            <StyledThemeProvider theme={Theme}>
              <CssBaseline />
              <GlobalStyles theme={Theme} />
              <Component {...pageProps} />
            </StyledThemeProvider>
          </ThemeProvider>
        </StylesProvider>
      </Fragment>
    )
  }
}
