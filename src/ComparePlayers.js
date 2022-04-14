import React from 'react';
import axios from "axios";
import {
    DropdownButton,
    Dropdown,
    Card,
    ListGroup,
    ListGroupItem,
    ButtonGroup,
    Button,
    Container
} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {LeagueTable} from "./LeagueTable";
import {toast, ToastContainer} from "react-toastify";
import {BASE_PATH} from "./request_utils";
export  class ComparePlayers extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                players: [],
                player1_name: "Dan Biton",
                player2_name: "Gabi Kanichowsky",
                player1_id: 1,
                player2_id: 2,
                player1_details:{},
                player2_details:{}
            }
            this.handleSelectedPlayer1 = this.handleSelectedPlayer1.bind(this)
            this.handleSelectedPlayer2 = this.handleSelectedPlayer2.bind(this)
            this.GetPlayersDetails = this.GetPlayersDetails.bind(this)

        }
    componentDidMount() {
        axios
            .get(`${BASE_PATH}/api/v1/leagues/`+this.props.location.pathname.split('/')[2] + '/players')
            .then(res =>this.setState({players:res.data}))
        this.GetPlayersDetails()
    }
    renderPlayer(player){
            return (
                    <Dropdown.Item key={player.id} eventKey={player.id}>
                        {player.name}
                    </Dropdown.Item>
        )
    }
    GetPlayersDetails()
    {

            console.log(`${BASE_PATH}/api/v1/stats/compare_players?player1_id=` +this.state.player1_id
                + '&player2_id=' + this.state.player2_id)
          axios
            .get(`${BASE_PATH}/api/v1/stats/compare_players?player1_id=` +this.state.player1_id
                + '&player2_id=' + this.state.player2_id )
            .then(res =>this.setState({player1_details:res.data[0],
                                            player2_details:res.data[1]}))
    }
    handleSelectedPlayer1(selected_player) {
            console.log(selected_player)
        if (selected_player === this.state.player2_id) {
            toast.error("Can't compare the same player")
        } else {
            this.setState({player1_id: selected_player})
        }
    }
    handleSelectedPlayer2(selected_player){
            console.log(selected_player)
            if (selected_player === this.state.player1_id) {
            toast.error("Can't compare the same player")
            }
            else {
                this.setState({player2_id: selected_player})
            }
        }

    render() {
            console.log(this.state.players)
            let playersObjects = this.state.players.map(
            this.renderPlayer)
        return (
            <Container>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className={'float-container '}>
                    <div className={'float-child'}>
                        <Card className={'blue-button'} style={{textAlign:"center"}}>
                          <Card.Img variant="top" src={this.state.player1_details.picture} />
                            <Card.Title>
                                {this.state.player1_details.name}
                            </Card.Title>
                            <Card.Text>
                                {this.state.player1_details.team}
                          <ListGroup className="list-group-flush card-image">
                            <ListGroupItem style={{color:"whitesmoke"}} className={'blue-button'} >Goals - {this.state.player1_details.goals} </ListGroupItem>
                            <ListGroupItem style={{color:"whitesmoke"}} className={'blue-button'}>Assists - {this.state.player1_details.assists}</ListGroupItem>
                            <ListGroupItem style={{color:"whitesmoke"}} className={'blue-button'}>
                                Yellow Cards - {this.state.player1_details.yellow_cards}
                            </ListGroupItem>
                              <ListGroupItem style={{color:"whitesmoke"}} className={'blue-button'}>
                                Red Cards - {this.state.player1_details.red_cards}
                            </ListGroupItem>
                          </ListGroup>
                             </Card.Text>
                        </Card>
                    </div>
                    <div className={'float-child'}>
                        <Card className={'blue-button'} style={{textAlign:"center"}}>
                          <Card.Img variant="top" src={this.state.player2_details.picture} />
                            <Card.Title>
                                {this.state.player2_details.name}
                            </Card.Title>
                            <Card.Text>
                                {this.state.player2_details.team}
                          <ListGroup className="list-group-flush card-image">
                            <ListGroupItem style={{color:"whitesmoke"}} className={'blue-button'} >Goals - {this.state.player2_details.goals} </ListGroupItem>
                            <ListGroupItem style={{color:"whitesmoke"}} className={'blue-button'}>Assists - {this.state.player2_details.assists}</ListGroupItem>
                            <ListGroupItem style={{color:"whitesmoke"}} className={'blue-button'}>
                                Yellow Cards - {this.state.player2_details.yellow_cards}
                            </ListGroupItem>
                              <ListGroupItem style={{color:"whitesmoke"}} className={'blue-button'}>
                                Red Cards - {this.state.player2_details.red_cards}
                            </ListGroupItem>
                          </ListGroup>
                             </Card.Text>
                        </Card>
                    </div>
                        <div className={'float-child'}>
                            <h1 style={{ textAlign:"center"}}>Compare Players</h1>
                                <ButtonGroup>
                                <DropdownButton  id="dropdown-basic-button" title={this.state.player1_name} onSelect={this.handleSelectedPlayer1}>
                                    {playersObjects}
                                </DropdownButton>
                                    <Button style={{borderRadius:"5px"}} className={'blue-button'} onClick={()=>this.GetPlayersDetails()}>
                                        Compare
                                    </Button>
                                <DropdownButton  id="dropdown-basic-button" title={this.state.player2_name} onSelect={this.handleSelectedPlayer2}>
                                    {playersObjects}
                                </DropdownButton>
                                </ButtonGroup>
                        </div>
                </div>
            </Container>

        );
    }
}
export const WrappedComparePlayers = props => {

    const location = useLocation()
    console.log(location)
    return <ComparePlayers location={location} {...props} />
  }