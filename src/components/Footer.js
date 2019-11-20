import React from 'react'
//import InstagramFeed from './InstagramFeed'
import './Footer.css'
import { Link } from 'gatsby'

export default () => (
  <div>
    <br />
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved. Created by{' '}
          <a href="https://aecloud.co/" target="_blank" rel="noopener noreferrer">Austin Ellingwood</a>.
          <span> | </span>
          <Link to="/privacy">Privacy Policy</Link>
        </span>
      </div>
    </footer>
  </div>
)
