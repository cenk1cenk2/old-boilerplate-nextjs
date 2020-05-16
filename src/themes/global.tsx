import { createGlobalStyle, css, DefaultTheme } from 'styled-components'

export const GlobalStyles = createGlobalStyle(({ theme }) => css`
${body(theme)}
${fonts(theme)}
${headings(theme)}
${textColor(theme)}
${icons(theme)}
${links(theme)}
${progress(theme)}
`)

function body (theme: DefaultTheme) {
  const o = `
  body, #__next {
    overflow-x: hidden;
    height: 100%;
    width: 100%;
    margin: 0;
    z-index: 0;
  }
  `
  return css`${o}`
}

function fonts (theme: DefaultTheme) {
  const o = Object.values(theme.text.font).reduce((o, font) => {
    o += `
@font-face {
  font-family: ${font.name};
  font-style: normal;
  font-weight: 300;
  src: local('Lato Light'), local('Lato-Light'),
       url('/fonts/${font.path}-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/${font.path}-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
@font-face {
  font-family: ${font.name};
  font-style: normal;
  font-weight: 400;
  src: local('Lato Regular'), local('Lato-Regular'),
       url('/fonts/${font.path}-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/${font.path}-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
@font-face {
  font-family: ${font.name};
  font-style: italic;
  font-weight: 400;
  src: local('Lato Italic'), local('Lato-Italic'),
       url('/fonts/${font.path}-italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/${font.path}-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
@font-face {
  font-family: ${font.name};
  font-style: normal;
  font-weight: 700;
  src: local('Lato Bold'), local('Lato-Bold'),
       url('/fonts/${font.path}-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/${font.path}-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
@font-face {
  font-family: ${font.name};
  font-style: normal;
  font-weight: 900;
  src: local('Lato Black'), local('Lato-Black'),
       url('/fonts/${font.path}-900.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/${font.path}-900.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
      `
    return o
  }, '')
  return css`${o}`
}

function headings (theme: DefaultTheme) {
  const o = Object.entries(theme.text.typography.heading).reduce((o, [ name, value ]) => {
    o += `
    ${name},
    .${name} {
      font-size: ${value.fontSize};
      margin: 0;
      font-family: ${theme.text.font.heading.name};
      font-weight: ${theme.text.settings.heading.fontWeight};
      line-height: ${theme.text.settings.heading.lineHeight};
      color: ${theme.text.settings.heading.color};

      small,
      .small {
        font-size: 85%;
        color: ${theme.text.settings.heading.smallColor};
      }

    }
    `
    return o
  }, '')
  return css`${o}`
}

function textColor (theme: DefaultTheme) {
  const o = Object.entries(theme.colors).reduce((o, [ name, value ]) => {
    o += `
    .text-${name} {
      color: ${value};
    }
    `
    return o
  }, '')
  return css`${o}`
}

function icons (theme: DefaultTheme) {
  return css`
  .svg-inline--fa {
    font-size: 0.85em;
  }
  `
}

function links (theme: DefaultTheme) {
  return css`
  // Links
  a {
    color: ${theme.colors.primary};
    transition: color 0.12s ease-out;

    &.subtle {
      color: ${theme.colors.text};
      text-decoration: none;

      &:hover,
      &:focus {
        color: ${theme.colors.text};
        text-decoration: none;
      }
    }

    &.link-effect {
      position: relative;

      &:before {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        content: '';
        background-color: ${theme.colors.success};
        visibility: hidden;
        transform: scaleX(0);
        transition: transform 0.12s ease-out;
      }
    }

    &:hover,
    &:focus {
      color: ${theme.colors.primary};
      text-decoration: ${theme.colors.primary};

      &.link-effect:before {
        visibility: visible;
        transform: scaleX(1);
      }
    }

    &:active {
      color: ${theme.colors.primary};
    }

    &.inactive {
      cursor: not-allowed;

      &:focus {
        background-color: transparent !important;
      }
    }
  }
  `
}

function progress (theme: DefaultTheme) {
  return css`
/* Make clicks pass-through */
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: #efefef;

  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 5px ${theme.colors.primary}, 0 0 5px ${theme.colors.primary};
  opacity: 1;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
  -ms-transform: rotate(3deg) translate(0px, -4px);
  transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 9999;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: #efefef;
  border-left-color: #efefef;
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
  animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes nprogress-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`
}