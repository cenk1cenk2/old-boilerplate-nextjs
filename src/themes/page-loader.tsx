import { Component, Fragment } from 'react'

export default class PageLoader extends Component {
  render () {
    return (
      <Fragment>
        {/* Initial Page Loader */}
        <div id="page-loader">
          <div className="base">
            <div className="logo" />
            <div className="spinner">
              <div className="dot" />
              <div className="dots">
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
        </div>
        {/* END Initial Page Loader */}
      </Fragment>
    )
  }
}
