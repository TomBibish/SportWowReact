
import './App.css';
import React from 'react';
import { Nav, NavDropdown} from "react-bootstrap";
import { WrappedLeagueTable} from "./LeagueTable";
import { WrappedTopScorers} from "./TopScorers";
import { WrappedTopAssists} from "./TopAssists";
import {Matches} from "./Matches";
import axios from "axios";
import { WrappedTeamDetails} from "./TeamDetails";
import { WrappedComparePlayers} from "./ComparePlayers";
import {LoginForm} from "./LoginForm";
import {SignoutForm} from "./SignOutForm";
import {Route, Routes} from "react-router-dom";
import {SignUpForm} from "./SignUpForm";
import {OrderTickets} from "./OrderTickets";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            teams:[],
            leagues:[],
            selectedLeague:'1',
            userProfile:{},
            show_login_form: false,
            showSignUpForm:false}
        this.handleSelectedLeague = this.handleSelectedLeague.bind(this)
        this.renderTeam = this.renderTeam.bind(this)
        this.handleUserProfile = this.handleUserProfile.bind(this)
    }
    componentDidMount() {
        const token = window.localStorage.getItem('token')
        axios
            .get('http://127.0.0.1:8000/api/v1/users/current', {headers: {Authorization: 'Token ' + token}})
            .then(res =>this.setState({userProfile:res.data}))
        axios
            .get('http://127.0.0.1:8000/api/v1/stats/league_table?league=1')
            .then(res =>this.setState({teams:res.data}))
        axios
            .get('http://127.0.0.1:8000/api/v1/leagues')
            .then(res =>this.setState({leagues:res.data}))
    }
    handleUserProfile(new_user_profile)
    {
        this.setState({userProfile:new_user_profile})
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
        console.log(window.localStorage.getItem('token'))
         return (
             <>
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Item disabled={true}>
                      <img className={'home-icon'} alt={''} src={'http://www.up2me.co.il/imgs/9030951.jpg'}/>
                    </Nav.Item>
                  </Nav.Item>
                    <Nav.Item>
                        {window.localStorage.getItem('token') !== null && <Nav.Link disabled={true}>
                        Hello {this.state.userProfile.username}
                    </Nav.Link>}
                  </Nav.Item>
                     {window.localStorage.getItem('token') === null &&
                  <Nav.Item>
                    <Nav.Link title="Item" onClick={() => this.setState({showSignUpForm: true})}>
                      Sign Up
                    </Nav.Link>
                  </Nav.Item>}
                    {window.localStorage.getItem('token') === null &&
                  <Nav.Item>
                    <Nav.Link title="Item" onClick={() => this.setState({show_login_form: true})}>
                      Sign In
                    </Nav.Link>
                  </Nav.Item>}
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
                  {window.localStorage.getItem('token') !== null && <Nav.Item>
                    <Nav.Link title="Item" href={'/tickets'}>
                      Order Tickets
                    </Nav.Link>
                  </Nav.Item>}
                  {window.localStorage.getItem('token') !== null && <Nav.Item>
                    <Nav.Link title="Item">
                      Your Tickets
                    </Nav.Link>
                  </Nav.Item>}
                    {window.localStorage.getItem('token') !== null &&
                        <SignoutForm handleUser={this.handleUserProfile} handleLogin={this.handleLogin}/>}
                </Nav>
                 <br/>
                 <LoginForm handleUser={this.handleUserProfile} show={this.state.show_login_form} onHide={() => this.setState({show_login_form: false})}/>
                 <SignUpForm handleUser={this.handleUserProfile} show={this.state.showSignUpForm} onHide={() => this.setState({showSignUpForm: false})}/>
                 <Routes>
                     <Route path="/matches" element={<Matches />} />
                     <Route path="/league/:league_id" element={<WrappedLeagueTable/>} />
                     <Route path="/league/:league_id/top_scorers" element={<WrappedTopScorers/>}/>
                     <Route path="/league/:league_id/top_assists" element={<WrappedTopAssists/>}/>
                     <Route path="/league/:league_id/compare_players" element={<WrappedComparePlayers/>}/>
                     <Route path="/team/:team_name" element={<WrappedTeamDetails/>}/>
                     <Route path="/tickets" element={<OrderTickets/>}/>
                 </Routes>
             </>
        )
    }
}

export default App;
