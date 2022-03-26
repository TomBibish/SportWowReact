import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import {Button, Card, CardGroup, Container} from 'react-bootstrap';
import axios from 'axios';

export class OrderTickets extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tickets:[]
        }

        this.renderTickets = this.renderTickets.bind(this)
    }
    componentDidMount() {
        const token = window.localStorage.getItem('token')
        axios
            .get('http://127.0.0.1:8000/api/v1/tickets', {headers: {Authorization: 'Token ' + token}})
            .then(res =>this.setState({tickets:res.data}))
    }
    renderTickets(ticket){
        return(
                  <Card border={'primary'} style={{margin:"10px"}}>
                    <Card.Img style={{height:"90%"}} variant="top" src={ticket.match.home_team.stadium.picture_url}/>
                    <Card.Body style={{textAlign:"center"}}>
                      <Card.Title><img alt={""} className={"table-icon-league"} src={ticket.match.home_team.picture_url}/>
                         <img alt={""} className={"table-icon-league"} src={"https://thumbs.dreamstime.com/b/vs-versus-letters-vector-logo-line-icon-isolated-white-background-vs-versus-symbol-confrontation-opposition-vs-versus-175695319.jpg"}/>
                          <img alt={""} className={"table-icon-league"} src={ticket.match.away_team.picture_url}/>
                      </Card.Title>
                      <Card.Text>
                          <p>{ticket.match.home_team.name} VS {ticket.match.away_team.name}</p>
                          <p>Match from the {ticket.match.round} round of the {ticket.match.home_team.league.name}</p>
                          <p>Would play in {ticket.match.home_team.stadium.name} at {ticket.match.game_date}</p>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <div className={"center-button"}>
                            <Button>Order for {ticket.price}$</Button>
                        </div>
                    </Card.Footer>
                  </Card>

        )
    }
    render () {
        let ticketsObject = this.state.tickets.map(
            this.renderTickets
        )
        return(
            <Container>
                <CardGroup style={{width:"100%"}}>
                    {ticketsObject}
                </CardGroup>
            </Container>
        )
    }
}