import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

class ServerInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            players: null,
            lastWipe: null,
            status: null,
            size: null,
            maxPlayers: null,
            url: null
        };
  }

  componentDidMount() {
    const serverId = this.props.serverId
    const url = 'https://api.battlemetrics.com/servers/'
    //console.log(serverId)
    const apiUrl = url + serverId

    fetch(apiUrl)
    .then(res => res.json())
    .then(
        (result) => {
            const date = new Date(result.data.attributes.details.rust_last_wipe)
            const month = date.getUTCMonth() + 1
            const day = date.getUTCDate()
            const newD = month+'/'+day
            const serverUrl = 'steam://connect/' + result.data.attributes.ip + ':' + result.data.attributes.port
          this.setState({
            isLoaded: true,
            lastWipe: newD,
            players: result.data.attributes.players,
            maxPlayers: result.data.attributes.maxPlayers,
            size: result.data.attributes.details.rust_world_size,
            status: result.data.attributes.status,
            url: serverUrl
          });
          //console.log(result.data.attributes)
          //console.log(this.state.items)

  },
  (error) => {
    this.setState({
      isLoaded: true,
      error
    });
  }
    )
}

  render () {
    const { error, isLoaded, lastWipe, players, maxPlayers, size, status, url } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
            <div className="row">
            <div className="col-sm">
                <a className="btn btn-primary btn-lg" href={url} target="_blank" rel="noopener noreferrer">Join</a>
            </div>
            <div className="col-md">
               <h3>Status</h3>
            </div>
          <div className="col-md">
               <h3>Players</h3>
               </div>
            <div className="col-md">
            <h3>Last Wipe</h3>
            </div>
            <div className="col-md">
            <h3>Map Size</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-sm">
            </div>
            <div className="col-md">
               <h4 className={status==='online' ? "text-success" : "text-failure"}>{status}</h4>
            </div>
          <div className="col-md">
          <h4>{players}/{maxPlayers}</h4>
               </div>
            <div className="col-md">
            <h4>{lastWipe}</h4>
            </div>
            <div className="col-md">
            <h4>{size}</h4>
            </div>
          </div>
          </div>
      );
    }
  }
}

  export default ServerInfo