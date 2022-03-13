import React from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";
export  class TopScorers extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            top_scorers: [],
        }
    }
    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/v1/stats/goals_leader?league=1')
            .then(res =>this.setState({top_scorers:res.data}))
        console.log('top_scorers' + this.state.top_scorers)

    }
    renderPlayer(player) {
        return (
            <tr>
                <td><img className={'table-icon'} src={player.picture} alt={''}/></td>
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
                <Table style={{'textAlign': 'center'}} striped bordered hover>
                      <thead>
                        <tr>
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
            </>
        )
    }
}