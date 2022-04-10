import React from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {BASE_PATH} from "./request_utils";
export  class TopScorers extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            top_scorers: [],
        }
    }
    componentDidMount() {
        axios
            .get(`${BASE_PATH}/api/v1/stats/goals_leader?league=` + this.props.location.pathname.split('/')[2])
            .then(res =>this.setState({top_scorers:res.data}))
        console.log('top_scorers' + this.state.top_scorers)

    }
    renderPlayer(player) {
        return (
            <tr key={player.id} className={'blue-tr'}>
                <td><img className={'rounded-circle table-icon' }   src={player.picture} alt={''}/></td>
                <td>{player.name}</td>
                <td>{player.team}</td>
                <td>{player.goals}</td>
            </tr>
        )
    }
    render() {
        let playersObjects = this.state.top_scorers.map(
            this.renderPlayer
        )
        return(
            <>
                <div className={'center'} style={{'width': '40%'}}>
                    <h1 className={'the-title'}>Top Scorers</h1>
                    <Table style={{'textAlign': 'center', 'border': "#7A91B1"}}  bordered hover>
                          <thead>
                            <tr className={'blue-tr'}>
                              <th> </th>
                              <th>Name</th>
                              <th>Team</th>
                              <th>Goals</th>
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
export const WrappedTopScorers = props => {

    const location = useLocation()
    console.log(location)
    return <TopScorers location={location} {...props} />
  }