
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
import {UserTickets} from "./UserTickets";
import {UserProfile} from "./UserProfile";
import {HomePage} from "./HomePage";

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
                <img className={'player-table-icon'} src={team.picture}/>{team.name}
            </NavDropdown.Item>
        )
    }
    renderLeague(league) {
        return (
            <NavDropdown.Item href={'/league/' + league.id} key={league.id} eventKey={league.id}>
                <img className={'player-table-icon'} src={league.picture_url}/>{league.name}
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
                <Nav variant="pills" className={"nav-bar"}>
                  <Nav.Item>
                    <Nav.Link href={"/"} >
                      <img className={'nav-bar-icon'} alt={''} src={'https://i.postimg.cc/8c8PFdf5/sport-wow.webp'}/>
                    </Nav.Link>
                  </Nav.Item>
                    <Nav.Item >
                        {window.localStorage.getItem('token') !== null && <Nav.Link style={{color:"whitesmoke"}} href={"/user_profile"}>
                       <img className={'player-table-icon'} src={'https://img.icons8.com/ios-glyphs/2x/user.png'}/> Hello {this.state.userProfile.username}
                    </Nav.Link>}
                  </Nav.Item>
                     {window.localStorage.getItem('token') === null &&
                  <Nav.Item>
                    <Nav.Link style={{color:"whitesmoke"}} title="Sign Up" onClick={() => this.setState({showSignUpForm: true})}>
                       <img className={'player-table-icon'} src={'https://cdn-icons-png.flaticon.com/128/72/72648.png'}/> Sign Up
                    </Nav.Link>
                  </Nav.Item>}
                    {window.localStorage.getItem('token') === null &&
                  <Nav.Item>
                    <Nav.Link style={{color:"whitesmoke"}} title="Log In" onClick={() => this.setState({show_login_form: true})}>
                      <img className={'player-table-icon'} src={'https://cdn-icons-png.flaticon.com/128/3596/3596092.png'}/> Log In
                    </Nav.Link>
                  </Nav.Item>}
                  <Nav.Item>
                    <Nav.Link style={{color:"whitesmoke"}} href={'/matches'} eventKey="matches"  title="Matches">
                      <img className={'player-table-icon'} src={'https://img.icons8.com/external-kmg-design-glyph-kmg-design/2x/external-score-board-american-football-kmg-design-glyph-kmg-design.png'}/> Matches
                    </Nav.Link>
                  </Nav.Item>
                  <NavDropdown     title={
                                <span style={{color:"whitesmoke"}}>
                                    <img className={'player-table-icon'} src={'https://img.icons8.com/external-tulpahn-basic-outline-tulpahn/2x/external-football-soccer-tulpahn-basic-outline-tulpahn-5.png'}/> Teams
                                </span>
                            } id="nav-dropdown">
                      {teamsObjects}
                  </NavDropdown>
                  <NavDropdown  title={
                                <span style={{color:"whitesmoke"}}><img className={'player-table-icon'} src={'https://cdn-icons-png.flaticon.com/128/4768/4768569.png'}/> Leagues</span>}
                               id="nav-dropdown" onSelect={this.handleSelectedLeague}>
                      {leagueObjects}
                  </NavDropdown>
                  {window.localStorage.getItem('token') !== null && <Nav.Item>
                    <Nav.Link style={{color:"whitesmoke"}} title="Tickets" href={'/tickets'}>
                      <img className={'player-table-icon'} src={'https://cdn-icons-png.flaticon.com/128/3702/3702886.png'}/> Order Tickets
                    </Nav.Link>
                  </Nav.Item>}
                  {window.localStorage.getItem('token') !== null && <Nav.Item>
                    <Nav.Link style={{color:"whitesmoke"}} href={'/ordered_tickets'} title="Your Tickets">
                      <img className={'player-table-icon'} src={'https://cdn-icons-png.flaticon.com/128/389/389801.png'}/> Your Tickets
                    </Nav.Link>
                  </Nav.Item>}
                    {window.localStorage.getItem('token') !== null &&
                        <SignoutForm handleUser={this.handleUserProfile} handleLogin={this.handleLogin}/>}
                </Nav>
                 <LoginForm handleUser={this.handleUserProfile} show={this.state.show_login_form} onHide={() => this.setState({show_login_form: false})}/>
                 <SignUpForm handleUser={this.handleUserProfile} show={this.state.showSignUpForm} onHide={() => this.setState({showSignUpForm: false})}/>
                 {window.location.href ==='http://localhost:3000/' && <HomePage/>}
                 <Routes>
                     <Route path="/matches" element={<Matches />} />
                     <Route path="/league/:league_id" element={<WrappedLeagueTable/>} />
                     <Route path="/league/:league_id/top_scorers" element={<WrappedTopScorers/>}/>
                     <Route path="/league/:league_id/top_assists" element={<WrappedTopAssists/>}/>
                     <Route path="/league/:league_id/compare_players" element={<WrappedComparePlayers/>}/>
                     <Route path="/team/:team_name" element={<WrappedTeamDetails/>}/>
                     <Route path="/tickets" element={<OrderTickets/>}/>
                     <Route path="/ordered_tickets" element={<UserTickets userProfile={this.state.userProfile}/>} />
                     <Route path="/user_profile" element={<UserProfile/>}/>
                 </Routes>
             </>
        )
    }
}

export default App;
