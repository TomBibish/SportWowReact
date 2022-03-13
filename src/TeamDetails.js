import React from 'react';
import axios from "axios";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
export  class TeamDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            team: {},
            stadium:{},
            league:{}
        }
    }
    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/v1/teams/'+ this.props.team.replace(" ", "%20"))
            .then(res =>this.setState({team:res.data,
                                            stadium:res.data.stadium,
                                            league:res.data.league}))

    }
    render() {
        return(
                <div className={'center'}>
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
                      </ListGroup>
                      <Card.Body>
                        <Card.Link href="#"><img className={'home-icon'} src={this.state.league.picture_url}/> </Card.Link>
                        <Card.Link href="#">{}</Card.Link>
                      </Card.Body>
                    </Card>
                </div>
        )
    }
}