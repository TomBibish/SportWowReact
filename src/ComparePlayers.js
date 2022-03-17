import React from 'react';
import axios from "axios";
import {DropdownButton, Dropdown, Card, ListGroup, ListGroupItem, ButtonGroup, Button} from "react-bootstrap";
export  class ComparePlayers extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                players: [],
                player1_name: 'Dan Biton',
                player2_name: 'Gabi Kanichowsky',
                player1_details:{},
                player2_details:{}
            }
            this.handleSelectedPlayer1 = this.handleSelectedPlayer1.bind(this)
            this.handleSelectedPlayer2 = this.handleSelectedPlayer2.bind(this)
            this.GetPlayersDetails = this.GetPlayersDetails.bind(this)

        }
    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/v1/leagues/'+this.props.league + '/players')
            .then(res =>this.setState({players:res.data}))
        this.GetPlayersDetails()
    }
    renderPlayer(player){
            return (
                    <Dropdown.Item eventKey={player.name}>
                        {player.name}
                    </Dropdown.Item>
        )
    }
    GetPlayersDetails()
    {
            let player1_full_name = this.state.player1_name.split(" ")
            let player2_full_name = this.state.player2_name.split(" ")
          axios
            .get('http://127.0.0.1:8000/api/v1/stats/compare_players?player1_first_name=' +player1_full_name[0]
                + '&player1_last_name=' + player1_full_name[1] + '&player2_first_name='
                +player2_full_name[0] + '&player2_last_name=' +player2_full_name[1] )
            .then(res =>this.setState({player1_details:res.data[0],
                                            player2_details:res.data[1]}))
    }
    handleSelectedPlayer1(selected_player) {
        if (selected_player === this.state.player2_name) {
            window.alert("Can't compare the same player")
        } else {
            this.setState({player1_name: selected_player})
        }
    }
    handleSelectedPlayer2(selected_player){
            if (selected_player === this.state.player1_name) {
                window.alert("Can't compare the same player")
            }
            else {
                this.setState({player2_name: selected_player})
            }
        }

    render() {
            let playersObjects = this.state.players.map(
            this.renderPlayer)
        return (
            <div>
                <div className={'float-container '}>
                    <div className={'float-child'}>
                        <Card style={{ width: '18rem', height:'26rem' }}>
                          <Card.Img variant="top" src={this.state.player1_details.picture} />
                          <Card.Body>
                                <Card.Title>
                                    {this.state.player1_details.name}
                                </Card.Title>
                                <Card.Text>
                                    {this.state.player1_details.team}
                                </Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroupItem>Goals - {this.state.player1_details.goals} </ListGroupItem>
                            <ListGroupItem>Assists - {this.state.player1_details.assists}</ListGroupItem>
                            <ListGroupItem>
                                Yellow Cards - {this.state.player1_details.yellow_cards}
                            </ListGroupItem>
                              <ListGroupItem>
                                Red Cards - {this.state.player1_details.red_cards}
                            </ListGroupItem>
                          </ListGroup>
                        </Card>
                    </div>
                    <div className={'float-child'}>
                        <Card style={{ width: '18rem', height:'26rem' }}>
                          <Card.Img variant="top" src={this.state.player2_details.picture} />
                          <Card.Body>
                            <Card.Title>
                                {this.state.player2_details.name}
                            </Card.Title>
                            <Card.Text>
                                {this.state.player2_details.team}
                            </Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroupItem>Goals - {this.state.player2_details.goals} </ListGroupItem>
                            <ListGroupItem>Assists - {this.state.player2_details.assists}</ListGroupItem>
                            <ListGroupItem>
                                Yellow Cards - {this.state.player2_details.yellow_cards}
                            </ListGroupItem>
                              <ListGroupItem>
                                Red Cards - {this.state.player2_details.red_cards}
                            </ListGroupItem>
                          </ListGroup>
                        </Card>
                    </div>
                        <div className={'float-child'}>
                            <h1>Compare Players</h1>
                                <ButtonGroup>
                                <DropdownButton id="dropdown-basic-button" title={this.state.player1_name} onSelect={this.handleSelectedPlayer1}>
                                    {playersObjects}
                                </DropdownButton>
                                    <Button variant="secondary" onClick={()=>this.GetPlayersDetails()}>
                                        Compare
                                    </Button>
                                <DropdownButton id="dropdown-basic-button" title={this.state.player2_name} onSelect={this.handleSelectedPlayer2}>
                                    {playersObjects}
                                </DropdownButton>
                                </ButtonGroup>
                        </div>
                </div>
            </div>
        );
    }
}