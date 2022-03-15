import React from 'react';
import axios from "axios";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
export  class TeamDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            team: {},
            stadium:{},
            league:{},
            coach: {},
            crowd: 0
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
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.team !== this.props.team)
        this.componentDidMount()
    }

    render() {
        return(
                <div className={'float-container '}>
                    <div className={'float-child'}>
                        <Card style={{ width: '18rem' }}>
                          <Card.Img variant="top" src={this.state.team.picture_url} />
                          <Card.Body>
                            <Card.Title>{this.state.team.name}</Card.Title>
                            <Card.Text>
                              {this.state.team.name} which play in the {this.state.league.name}
                            </Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroupItem>Points this season: {this.state.team.points}</ListGroupItem>
                            <ListGroupItem>Goals - {this.state.team.goals_for}:{this.state.team.goals_against}</ListGroupItem>
                            <ListGroupItem>
                                Play home games in {this.state.stadium.name} ({this.state.stadium.capacity})
                            </ListGroupItem>
                              <ListGroupItem>
                                Average crowd in games {this.state.crowd.avg}
                            </ListGroupItem>
                          </ListGroup>
                        </Card>
                    </div>
                    <div className={'float-child'}>
                        <Card style={{ width: '18rem' }}>
                          <Card.Img variant="top" src={this.state.coach.picture_url} />
                          <Card.Body>
                            <Card.Title>{this.state.coach.first_name} {this.state.coach.last_name}</Card.Title>
                            <Card.Text>
                              Active coach of {this.state.team.name}
                            </Card.Text>
                              <Card.Body>
                            <Card.Link href="#"><img className={'home-icon'} src={this.state.league.picture_url}/> </Card.Link>
                          </Card.Body>
                          </Card.Body>
                        </Card>
                    </div>
                </div>
        )
    }
}