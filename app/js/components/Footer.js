'use strict';

import React, {Component} from 'react';

class Footer extends Component {

  constructor(props) {
    super(props);
  }

  _handleClick(text) {
    ga('send', 'event', 'button', 'footer', text);
  }

  render() {
    let style = !this.props.tracks ? 'footer fixed' : 'footer';
    return <div className={style}>
              <div className='copy'>
                Developed by <a
                  href='https://github.com/eulerkochy'
                  target='_blank'
                  onClick={this._handleClick.bind(this, '@eulerkochy')}
                >@eulerkochy
                </a> and <a
                  href='https://github.com/joyousprakhar'
                  target='_blank'
                  onClick={this._handleClick.bind(this, '@joyousprakhar')}>@joyousprakhar
                  </a>
              </div>
              <div className='spotify-api'>Created using the API of <a
                href='https://developer.spotify.com/web-api/'
                target='_blank'><img src='img/spotify-logo.png'
              /></a>
              </div>
            </div>;
  }
}

export default Footer;
