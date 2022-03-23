
import './App.css';
import React from 'react';
import { Nav, NavDropdown} from "react-bootstrap";
import {LeagueTable, WrappedLeagueTable} from "./LeagueTable";
import {TopScorers, WrappedTopScorers} from "./TopScorers";
import {TopAssists, WrappedTopAssists} from "./TopAssists";
import {Matches} from "./Matches";
import axios from "axios";
import {TeamDetails, WrappedTeamDetails} from "./TeamDetails";
import {ComparePlayers, WrappedComparePlayers} from "./ComparePlayers";
import {LoginForm} from "./LoginForm";
import {SignoutForm} from "./SignOutForm";
import {Route, Routes} from "react-router-dom";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            teams:[],
            leagues:[],
            selectedLeague:'1',
            'show_login_form': false}
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
            <NavDropdown.Item href={'/team/' + team.name} key={team.id} eventKey={team.name}>
                {team.name}
            </NavDropdown.Item>
        )
    }
    renderLeague(league) {
        return (
            <NavDropdown.Item href={'/league/' + league.id} key={league.id} eventKey={league.id}>
                {league.name}
            </NavDropdown.Item>
        )
    }
    handleSelectedLeague(selected_league){
        console.log(selected_league)
        this.setState({selectedLeague: selected_league})

        }
    render() {
        let teamsObjects = this.state.teams.map(
            this.renderTeam)
        let leagueObjects = this.state.leagues.map(
            this.renderLeague)
         return (
             <>
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link disabled={true}>
                      <img className={'home-icon'} alt={''} src={'sport_wow.jpg'}/>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link title="Item" onClick={() => this.setState({show_login_form: true})}>
                      Sign In
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href={'/matches'} eventKey="matches"  title="Item">
                      Matches
                    </Nav.Link>
                  </Nav.Item>
                  <NavDropdown title="Teams" id="nav-dropdown">
                      {teamsObjects}
                  </NavDropdown>
                  <NavDropdown title="Tables" id="nav-dropdown" onSelect={this.handleSelectedLeague}>
                      {leagueObjects}
                  </NavDropdown>
                    <SignoutForm/>
                </Nav>
                 <br/>
                 <LoginForm show={this.state.show_login_form} onHide={() => this.setState({show_login_form: false})}/>
                 <Routes>
                     <Route path="/matches" element={<Matches />} />
                     <Route path="/league/:league_id" element={<WrappedLeagueTable league = {this.state.selectedLeague}/>} />
                     <Route path="/league/:league_id/top_scorers" element={<WrappedTopScorers  league={this.state.selectedLeague} />}/>
                     <Route path="/league/:league_id/top_assists" element={<WrappedTopAssists  league={this.state.selectedLeague}/>}/>
                     <Route path="/league/:league_id/compare_players" element={<WrappedComparePlayers/>}/>
                     <Route path="/team/:team_name" element={<WrappedTeamDetails/>}/>
                 </Routes>
             </>
        )
    }
}

export default App;
