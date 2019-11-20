import React from 'react'
//import InstagramFeed from './InstagramFeed'
import './Footer.css'

export default () => (
  <div>
    <br />
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved. Created by{' '}
          <a href="https://aecloud.co/">Austin Ellingwood</a>.
        </span>
      </div>
    </footer>
  </div>
)
