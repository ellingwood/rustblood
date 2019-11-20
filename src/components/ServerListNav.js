import React from 'react'
import { Link } from 'gatsby'

import ServerSearch from './ServerSearch'
import './PostCategoriesNav.css'

const ServerListNav = ({ categories, enableSearch }) => (
  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to={`/servers`}>
      All
    </Link>
    {categories.map((category, index) => (
      <Link
        exact="true"
        className="NavLink"
        key={category.title + index}
        to={category.slug}
      >
        {category.title}
      </Link>
    ))}

    {enableSearch && <ServerSearch />}
  </div>
)

export default ServerListNav
