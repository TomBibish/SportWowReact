import React from 'react';
import axios from "axios";
import {Card, ListGroup, ListGroupItem, Table} from "react-bootstrap";
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
        axios
            .get('http://127.0.0.1:8000/api/v1/teams/' + this.props.team.replace(" ", "%20"))
            .then(res => this.setState({
                team: res.data,
                stadium: res.data.stadium,
                league: res.data.league
            }))
        axios
            .get('http://127.0.0.1:8000/api/v1/team_coach/' + this.props.team.replace(" ", "%20"))
            .then(res => this.setState({
                coach: res.data.coach}))
        axios
            .get('http://127.0.0.1:8000/api/v1/stats/crowd_avg?team=' + this.props.team.replace(" ", "%20"))
            .then(res => this.setState({
                crowd: res.data[0]}))
        axios
            .get('http://127.0.0.1:8000/api/v1/teams/'+ this.props.team.replace(" ", "%20") + '/players')
            .then(res => this.setState({
                players: res.data}))
        console.log(this.state.players)
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
                <div className={'float-container '}>
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
                          <Card.Img variant="top" src={this.state.coach.picture_url} style={{width:'100%', height:'90%'}} />
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
                              <img alt={''} className={'player-table-icon'} src={'https://cdn-icons.flaticon.com/png/128/5281/premium/5281619.png?token=exp=1647464261~hmac=350c3465c65bfac48e8dac60932b3484'}/>
                          </th>
                          <th>
                              <img alt={''} className={'player-table-icon'} src={'https://cdn-icons-png.flaticon.com/128/27/27221.png'}/>
                          </th>
                          <th>
                              <img alt={''} className={'player-table-icon'} src={'https://cdn-icons.flaticon.com/png/128/4074/premium/4074301.png?token=exp=1647462875~hmac=7fc8221c173261a5c658b454ed86ce39'}/>
                          </th>
                          <th>
                              <img alt={''} className={"player-table-icon"} src={'https://cdn-icons-png.flaticon.com/128/1165/1165218.png'}/>
                          </th>
                          <th>
                              <img alt={''} className={"player-table-icon"} src={'https://cdn-icons.flaticon.com/png/512/5370/premium/5370178.png?token=exp=1647462396~hmac=ba438e0148d61f096f74e561c8105f9c'}/>
                          </th>
                          <th>
                              <img alt={''} className={"player-table-icon"} src={'https://cdn-icons.flaticon.com/png/512/5174/premium/5174382.png?token=exp=1647462497~hmac=aa9006958be21691108f58f865f757e4'}/>
                          </th>
                          <th>
                              <img alt={''} className={"player-table-icon"} src={'https://cdn-icons.flaticon.com/png/512/5174/premium/5174171.png?token=exp=1647462484~hmac=5668dba2bc6c939f55a5c942267713c9'}/>
                          </th>
                        </tr>
                      </thead>
                    <tbody>
                        {playerObjects}
                    </tbody>
                </Table>
                    </div>
                </div>
        )
    }
}