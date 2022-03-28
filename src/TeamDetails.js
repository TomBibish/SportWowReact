import React from 'react';
import axios from "axios";
import {Card, Container, ListGroup, ListGroupItem, Table} from "react-bootstrap";
import {useLocation} from "react-router-dom";
export  class TeamDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            team: {},
            stadium:{},
            league:{},
            coach: {},
            crowd: 0,
            players: []
        }
    }
    componentDidMount() {
        console.log(this.props.location.pathname.split('/')[2])
        axios
            .get('http://127.0.0.1:8000/api/v1/teams/' + this.props.location.pathname.split('/')[2])
            .then(res => this.setState({
                team: res.data,
                stadium: res.data.stadium,
                league: res.data.league
            }))
        axios
            .get('http://127.0.0.1:8000/api/v1/team_coach/' + this.props.location.pathname.split('/')[2])
            .then(res => this.setState({
                coach: res.data.coach}))
        axios
            .get('http://127.0.0.1:8000/api/v1/stats/crowd_avg?team=' + this.props.location.pathname.split('/')[2])
            .then(res => this.setState({
                crowd: res.data[0]}))
        axios
            .get('http://127.0.0.1:8000/api/v1/teams/'+ this.props.location.pathname.split('/')[2] + '/players')
            .then(res => this.setState({
                players: res.data}))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.team !== this.props.team)
        this.componentDidMount()
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

    render() {
        let playerObjects = this.state.players.map(
            this.renderPlayer)
        return(
                <Container>
                    <div className={'float-child'}>
                        <Card style={{ width: '18rem', height:'26rem'}}>
                          <Card.Img variant="top" src={this.state.team.picture_url} className={'blue-button'} />
                          <Card.Body className={'blue-button'}>
                            <Card.Title >{this.state.team.name}</Card.Title>
                            <Card.Text>
                              {this.state.team.name} which play in the {this.state.league.name}
                            </Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroupItem className={'blue-button'}>Points this season: {this.state.team.points}</ListGroupItem>
                            <ListGroupItem className={'blue-button'}>Goals - {this.state.team.goals_for}:{this.state.team.goals_against}</ListGroupItem>
                            <ListGroupItem className={'blue-button'}>
                                Play home games in {this.state.stadium.name} ({this.state.stadium.capacity})
                            </ListGroupItem>
                              <ListGroupItem className={'blue-button'}>
                                Average crowd in games {this.state.crowd.avg}
                            </ListGroupItem>
                          </ListGroup>
                        </Card>
                    </div>
                    <div className={'float-child'}>
                        <Card style={{ width: '18rem', height:'26rem' }} className={'blue-button'}>
                          <Card.Img variant="top" src={this.state.coach.picture_url} style={{width:'100%', height:'90%'}}
                          className={'blue-button'} />
                            <Card.Text>
                                <div style={{textAlign: "center"}}>
                             {this.state.coach.first_name} {this.state.coach.last_name}
                                <br/>
                                Active Coach
                                </div>
                            </Card.Text>
                        </Card>
                    </div>
                    <div className={'float-child'}>
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
                </Container>
        )
    }
}

export const WrappedTeamDetails = props => {

    const location = useLocation()
    console.log(location)
    return <TeamDetails location={location} {...props} />
  }