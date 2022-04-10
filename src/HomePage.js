import React from 'react';
import {Carousel, Container, Table} from "react-bootstrap";
import axios from "axios";
import {BASE_PATH} from "./request_utils";

export class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            team:{},
            matches:[],
            players:[]
        }
    }
    componentDidMount() {
        const token = window.localStorage.getItem('token')
        if (token)
        {
             axios
                 .get(`${BASE_PATH}/api/v1/user_profile/current`, {headers: {Authorization: 'Token ' + token}})
                 .then(res =>
                     (axios
                        .get(`${BASE_PATH}/api/v1/teams/` + res.data.favorite_team)
                        .then(res => this.setState({
                            team: res.data})),
                      (axios
                        .get(`${BASE_PATH}/api/v1/matches?team=` + res.data.favorite_team)
                        .then(res => this.setState({
                            matches: res.data}))),

                        (axios
                            .get(`${BASE_PATH}/api/v1/teams/`+  res.data.favorite_team + '/players')
                            .then(res => this.setState({
                                players: res.data})))
                     ))
        }
    }
    renderMatch(match) {
        return (
            <tr key={match.id}  className={'blue-tr-head'} >
                <td>{match.round}</td>
                <td>{match.game_date}</td>
                <td><img className={'table-icon'} alt={''} src={match.home_team.picture_url}/></td>
                <td>{match.home_score}:{match.away_score}</td>
                <td><img className={'table-icon'} alt={''} src={match.away_team.picture_url}/></td>
                <td>{match.attendance}</td>
            </tr>
        )
    }
    renderPlayer(player) {
        return (
            <tr>
                <td><img className={'table-icon-league'} src={player.picture} alt={''}/></td>
                <td>{player.name}</td>
                <td>{player.appearances}</td>
                <td>{player.goals}</td>
                <td>{player.assists}</td>
                <td>{player.yellow_cards}</td>
                <td>{player.red_cards}</td>
            </tr>
        )
    }
    render () {
        let matchObjects = this.state.matches.map(
            this.renderMatch)
        let playerObjects = this.state.players.map(
            this.renderPlayer)
        return(
            <>
                {window.localStorage.getItem('token') === null ?
                    <Container style={{alignItems: "center"}}>
                        <h1 className={"the-title"}>Welcome to Sport WoW</h1>
                        <h2 style={{textAlign: "center"}}>Sport news, scores and ticket order website</h2>
                        <h6 style={{textAlign: "center"}}>Here you can see some examples of our great features</h6>
                        <Carousel variant={"dark"} fade={true} className={"center-carousal"}>
                            <Carousel.Item interval={1800}>
                                <img style={{
                                    display: "block",
                                    height: "auto",
                                    maxWidth: "100%"
                                }}
                                     className="d-block w-100 card-image"
                                     src="/matches.jpg"
                                     alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h5 className={'caption'}>Leagues Tables</h5>
                                    <p className={'caption'}>See the current and up to dated league tables from all
                                        around the globe</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={1800}>
                                <img style={{
                                    display: "block",
                                    height: "auto",
                                    maxWidth: "100%"
                                }}
                                     className="d-block w-100 card-image"
                                     src="team.jpg"
                                     alt="Second slide"
                                />
                                <Carousel.Caption>
                                    <h5 className={'caption'}>Team details</h5>
                                    <p className={'caption'}>Get all Needed information about your favorites teams</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={1800}>
                                <img style={{
                                    display: "block",
                                    height: "auto",
                                    maxWidth: "100%"
                                }}
                                     className="d-block w-100 card-image"
                                     src="/tickets.jpg"
                                     alt="Third slide"
                                />
                                <Carousel.Caption>
                                    <h5 className={'caption'}>
                                        Order Tickets
                                    </h5>
                                    <p className={'caption'}>
                                        Order tickets for your wanted games with simple and safe payment</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={1800}>
                                <img style={{
                                    display: "block",
                                    height: "auto",
                                    maxWidth: "100%"
                                }}
                                     className="d-block w-100 card-image"
                                     src="/comare.jpg"
                                     alt="Third slide"
                                />
                                <Carousel.Caption>
                                    <h5 className={'caption'}>
                                        Compare Players
                                    </h5>
                                    <p className={'caption'}>
                                        Compare your favorite players from every league and club</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                        <h6 style={{textAlign: "center"}}> And ALOT more is waiting just for you...</h6>
                    </Container>
                    :
                    <Container>
                        <br/>
                        <h1 className={'the-title'}>Welcome Back</h1>
                        <div className={'float-child'}>
                            <img className={'symbol'} alt={''} src={this.state.team.picture_url}/>
                        </div>
                        <div className={'float-child'}>
                            <h4 style={{textAlign:"center"}}>Your Favorite Team Squad</h4>
                            <Table style={{'textAlign': 'center',
                                    'border': this.state.team.color1,
                                'color':this.state.team.color2}} bordered hover>
                                  <thead>
                                    <tr>
                                      <th>
                                          <img alt={''} className={'player-table-icon'} src={'https://img.icons8.com/ios-glyphs/2x/person-male.png'}/>
                                      </th>
                                      <th>
                                          <img alt={''} className={'player-table-icon'} src={'https://cdn-icons-png.flaticon.com/128/27/27221.png'}/>
                                      </th>
                                      <th>
                                          <img alt={''} className={'player-table-icon'} src={'https://img.icons8.com/windows/2x/stadium.png'}/>
                                      </th>
                                      <th>
                                          <img alt={''} className={"player-table-icon"} src={'https://cdn-icons-png.flaticon.com/128/1165/1165218.png'}/>
                                      </th>
                                      <th>
                                          <img alt={''} className={"player-table-icon"} src={'https://img.icons8.com/external-those-icons-fill-those-icons/2x/external-chef-kitchen-those-icons-fill-those-icons.png'}/>
                                      </th>
                                      <th>
                                          <img alt={''} className={"player-table-icon"} src={'https://img.icons8.com/color/2x/soccer-yellow-card.png'}/>
                                      </th>
                                      <th>
                                          <img alt={''} className={"player-table-icon"} src={'https://img.icons8.com/color/2x/foul.png'}/>
                                      </th>
                                    </tr>
                                  </thead>
                                <tbody>
                                    {playerObjects}
                                </tbody>
                            </Table>
                        </div>
                        <br/>
                        <div className={'float-child'}>
                            <h4 style={{textAlign:"center"}}>Your Favorite Team Matches</h4>
                            <Table style={{'textAlign': 'center', 'border': "#7A91B1"}} bordered hover>
                              <thead>
                                <tr  className={'blue-tr-head'}>
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
                        </div>
                    </Container>
                }
            </>
        )
    }
}