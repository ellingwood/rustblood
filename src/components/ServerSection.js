import React from 'react'

import ServerCard from '../components/ServerCard'
import './PostSection.css'

class ServerSection extends React.Component {
  static defaultProps = {
    servers: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 12
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { servers, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visibleServers = servers.slice(0, limit || servers.length)

    return (
      <div className="PostSection">
        {title && <h2 className="PostSection--Title">{title}</h2>}
        {!!visibleServers.length && (
          <div className="PostSection--Grid">
            {visibleServers.map((server, index) => (
              <ServerCard key={server.title + index} {...server} />
            ))}
          </div>
        )}
        {showLoadMore && visibleServers.length < servers.length && (
          <div className="taCenter">
            <button className="button" onClick={this.increaseLimit}>
              {loadMoreTitle}
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default ServerSection
