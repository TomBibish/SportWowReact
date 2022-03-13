import React from 'react';
import axios from "axios";
import {Button, ButtonGroup, Table} from "react-bootstrap";
export  class Matches extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            matches: [],
        }
    }
    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/v1/matches')
            .then(res =>this.setState({matches:res.data}))

    }
    renderMatch(match) {
        return (
            <tr>
                <td>{match.round}</td>
                <td>{match.game_date}</td>
                <td><img className={'table-icon'} alt={''} src={match.home_team.picture_url}/></td>
                <td>{match.home_score}:{match.away_score}</td>
                <td><img className={'table-icon'} alt={''} src={match.away_team.picture_url}/></td>
                <td>{match.attendance}</td>
            </tr>
        )
    }
    render() {
        let matchObjects = this.state.matches.map(
            this.renderMatch)
        return(
            <>
                <Table style={{'textAlign': 'center'}} striped bordered hover>
                      <thead>
                        <tr>
                          <th>Round</th>
                          <th>Date</th>
                          <th>Home Team</th>
                          <th>Score</th>
                          <th>Away Team</th>
                          <th>Attendance</th>
                        </tr>
                      </thead>
                    <tbody>
                    {matchObjects}
                    </tbody>
                </Table>
                <br/>
            </>
        )
    }
}