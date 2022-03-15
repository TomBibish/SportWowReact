
import './App.css';
import React from 'react';
import { Nav, NavDropdown} from "react-bootstrap";
import {LeagueTable} from "./LeagueTable";
import {TopScorers} from "./TopScorers";
import {TopAssists} from "./TopAssists";
import {Matches} from "./Matches";
import axios from "axios";
import {TeamDetails} from "./TeamDetails";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: '',
            selectedTeam: 'HapoelNofHaglil',
            teams:[],
            leagues:[],
            selectedLeague:1}

        this.handleSelected = this.handleSelected.bind(this)
        this.handleSelectedTeam = this.handleSelectedTeam.bind(this)
        this.handleSelectedLeague = this.handleSelectedLeague.bind(this)
        this.renderTeam = this.renderTeam.bind(this)
    }
    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/v1/stats/league_table?league=1')
            .then(res =>this.setState({teams:res.data}))
        axios
            .get('http://127.0.0.1:8000/api/v1/leagues')
            .then(res =>this.setState({leagues:res.data}))
    }
    renderTeam(team) {
        return (
            <NavDropdown.Item eventKey={team.name}>
                {team.name}
            </NavDropdown.Item>
        )
    }
    renderLeague(league) {
        return (
            <NavDropdown.Item eventKey={league.id}>
                {league.name}
            </NavDropdown.Item>
        )
    }
    handleSelectedTeam(selected_team){
        this.setState({selectedKey: selected_team,
                            selectedTeam: selected_team})
        }
    handleSelectedLeague(selected_league){
        console.log(selected_league)
        this.setState({selectedKey: selected_league,
                            selectedLeague: selected_league})

        }
    handleSelected(selectedKey) {
        console.log(`HandleSelected ${selectedKey}`)
        this.setState({selectedKey: selectedKey})
    }
    renderMainView() {
        switch (this.state.selectedKey) {
            case "leagues":
                return <LeagueTable handleSelected={this.handleSelected}/>
            case "top_scorers":
                return <TopScorers league={this.state.selectedLeague} selected_key={this.state.selectedKey}/>
            case "top_assists":
                return <TopAssists league={this.state.selectedLeague} selected_key={this.state.selectedKey}/>
            case "matches":
                return <Matches/>
            case this.state.selectedTeam:
                return <TeamDetails team={this.state.selectedTeam}/>
            case this.state.selectedLeague:
                 return <LeagueTable league = {this.state.selectedLeague} handleSelected={this.handleSelected}/>
            default:
                return null
        }
    }

    render() {
        let teamsObjects = this.state.teams.map(
            this.renderTeam)
        let leagueObjects = this.state.leagues.map(
            this.renderLeague)
         return (
             <>
                <Nav variant="pills" onSelect={this.handleSelected}>
                  <Nav.Item>
                    <Nav.Link eventKey="1" href="" disabled={true}>
                      <img className={'home-icon'} alt={''} src={'sport_wow.jpg'}/>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="matches"  title="Item">
                      Matches
                    </Nav.Link>
                  </Nav.Item>
                  <NavDropdown title="Teams" id="nav-dropdown" onSelect={this.handleSelectedTeam}>
                      {teamsObjects}
                  </NavDropdown>
                  <NavDropdown title="Leagues" id="nav-dropdown" onSelect={this.handleSelectedLeague}>
                      {leagueObjects}
                  </NavDropdown>
                </Nav>
                 <br/>
                {this.renderMainView()}
             </>

        )
    }
}

export default App;
