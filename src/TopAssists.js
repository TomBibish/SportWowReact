import React from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {BASE_PATH} from "./request_utils";
export  class TopAssists extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            top_assists: [],
        }
    }
    componentDidMount() {
        axios
            .get(`${BASE_PATH}/api/v1/stats/assists_leader?league=` + this.props.location.pathname.split('/')[2])
            .then(res =>this.setState({top_assists:res.data}))
        console.log('top_assists' + this.state.top_assists)

    }
    renderPlayer(player) {
        return (
            <tr key={player.id} className={'blue-tr'}>
                <td><img className={'rounded-circle table-icon'} src={player.picture} alt={''} onError={e => { e.currentTarget.src = "https://cdn.footystats.org/img/players/northern%20ireland-jamal-lewis.png" }}/></td>
                <td>{player.name}</td>
                <td>{player.team}</td>
                <td>{player.assists}</td>
            </tr>
        )
    }
    render() {
        let playersObjects = this.state.top_assists.map(
            this.renderPlayer
        )
        return(
            <>
                <div className={'center'} style={{'width': '40%'}}>
                    <h1 className={'the-title'}>Assists Leader</h1>
                    <Table style={{'textAlign': 'center', 'border': "#7A91B1"}}  bordered hover>
                          <thead>
                            <tr className={'blue-tr'}>
                              <th> </th>
                              <th>Name</th>
                              <th>Team</th>
                              <th>Assists</th>
                            </tr>
                          </thead>
                        <tbody>
                        {playersObjects}
                        </tbody>
                    </Table>
                    <br/>
                </div>
            </>
        )
    }
}
export const WrappedTopAssists = props => {

    const location = useLocation()
    console.log(location)
    return <TopAssists location={location} {...props} />
  }