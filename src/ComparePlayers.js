import React, {useState} from 'react';
import axios from "axios";
import {
    DropdownButton,
    Dropdown,
    Card,
    ListGroup,
    ListGroupItem,
    ButtonGroup,
    Button,
    Container, FormControl
} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {LeagueTable} from "./LeagueTable";
import {toast, ToastContainer} from "react-toastify";
import {BASE_PATH} from "./request_utils";
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().includes(value.toLowerCase()),
          )}
        </ul>
      </div>
    );
  },
);

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
          axios
            .get(`${BASE_PATH}/api/v1/stats/compare_players?player1_id=` +this.state.player1_id
                + '&player2_id=' + this.state.player2_id )
            .then(res =>this.setState({player1_details:res.data[0],
                                            player2_details:res.data[1]}))
    }
    handleSelectedPlayer1(selected_player) {
            let player_name1 = null
            for(let i=0; i < this.state.players.length; i ++) {
                if(selected_player==this.state.players[i]['id']) {
                    player_name1 = this.state.players[i]['name']
                }
            }

        if (selected_player == this.state.player2_id) {
            toast.error("Can't compare the same player")
        } else {
            this.setState({player1_id: selected_player, player1_name:player_name1})
        }
    }

    handleSelectedPlayer2(selected_player){
            let player_name2 = null
            for(let i=0; i < this.state.players.length; i ++) {
                if(selected_player==this.state.players[i]['id']) {
                    player_name2 = this.state.players[i]['name']
                }
            }
            if (selected_player == this.state.player1_id) {
            toast.error("Can't compare the same player")
            }
            else {
                this.setState({player2_id: selected_player, player2_name:player_name2 })
            }
        }

    render() {
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
                <div className={'center-compare'}>
                        <h1 style={{ textAlign:"center"}}>Compare Players</h1>
                            <ButtonGroup>
                            <Dropdown  id="dropdown-basic-button" title={this.state.player1_name} onSelect={this.handleSelectedPlayer1}>
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                    {this.state.player1_name}
                                </Dropdown.Toggle>
                                <Dropdown.Menu as={CustomMenu}>
                                    {playersObjects}
                                </Dropdown.Menu>
                            </Dropdown>
                                <Button style={{borderRadius:"5px"}} className={'blue-button'} onClick={()=>this.GetPlayersDetails()}>
                                    Compare
                                </Button>
                            <Dropdown  id="dropdown-basic-button" title={this.state.player2_name} onSelect={this.handleSelectedPlayer2}>
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                    {this.state.player2_name}
                                </Dropdown.Toggle>
                                <Dropdown.Menu as={CustomMenu}>
                                    {playersObjects}
                                </Dropdown.Menu>
                            </Dropdown>
                            </ButtonGroup>
                </div>
                <br/>
                    <div className={'float-container '}>
                        <div className={'float-child'}>
                            <Card className={'blue-button'} style={{textAlign:"center"}}>
                              <Card.Img className={'card-image'} variant="top" src={this.state.player1_details.picture}
                                        onError={e => { e.currentTarget.src = "https://cdn.footystats.org/img/players/northern%20ireland-jamal-lewis.png" }} />
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
                              <Card.Img className={'card-image'} variant="top" src={this.state.player2_details.picture}
                              onError={e => { e.currentTarget.src = "https://cdn.footystats.org/img/players/northern%20ireland-jamal-lewis.png" }}/>
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