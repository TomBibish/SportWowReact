import React from 'react';
import axios from "axios";
import {Button, ButtonGroup, Dropdown, DropdownButton, Table} from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination'


export  class Matches extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            matches: [],
            rounds:[],
            round:1
        }
        this.handleSelctedRound = this.handleSelctedRound.bind(this)
    }
    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/v1/matches?round=' + this.state.round)
            .then(res =>this.setState({matches:res.data}))
        axios
            .get('http://127.0.0.1:8000/api/v1/rounds')
            .then(res =>this.setState({rounds:res.data}))
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
    renderRound(round)
    {
        return(
            <Dropdown.Item eventKey={round.round} >
                        {round.round}
            </Dropdown.Item>
        )
    }
    handleSelctedRound(selected_round)
    {
        axios
            .get('http://127.0.0.1:8000/api/v1/matches?round=' + selected_round)
            .then(res =>this.setState({matches:res.data}))
    }


    render() {
        let matchObjects = this.state.matches.map(
            this.renderMatch)
        let roundObjects = this.state.rounds.map(
            this.renderRound)
        return(
            <>
                <div className={'center'} style={{'width': '5%'}}>
                    <DropdownButton  id="dropdown-basic-button" title={'By Round'} onSelect={this.handleSelctedRound}>
                        {roundObjects}
                    </DropdownButton>
                </div>
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