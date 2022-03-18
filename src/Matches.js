import React from 'react';
import axios from "axios";
import {Button, ButtonGroup, Table} from "react-bootstrap";
import YouTube from "react-youtube";


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
            <tr  className={'blue-tr-head'}>
                <td>{match.round}</td>
                <td>{match.game_date}</td>
                <td><img className={'table-icon'} alt={''} src={match.home_team.picture_url}/></td>
                <td>{match.home_score}:{match.away_score}</td>
                <td><img className={'table-icon'} alt={''} src={match.away_team.picture_url}/></td>
                <td>{match.attendance}</td>
                <td>
                    <iframe title="Embeds Page" className="embed-responsive-item"
                            src={match.link}
                            allowFullScreen
                            height={'140px'}
                            width={'250px'}>
                    </iframe>
                </td>
            </tr>
        )
    }

    render() {
        let matchObjects = this.state.matches.map(
            this.renderMatch)
        return(
            <>
                <Table style={{'textAlign': 'center', 'border': "#7A91B1"}} bordered hover>
                      <thead>
                        <tr  className={'blue-tr-head'}>
                          <th>Round</th>
                          <th>Date</th>
                          <th>Home Team</th>
                          <th>Score</th>
                          <th>Away Team</th>
                          <th>Attendance</th>
                          <th>Game summary</th>
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