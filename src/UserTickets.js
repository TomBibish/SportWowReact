import React from 'react';
import {Button, Card, CardGroup, Container} from 'react-bootstrap';
import axios from 'axios';

export class UserTickets extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tickets:[],
            user: {}
        }
        this.renderTickets = this.renderTickets.bind(this)
        this.deleteTicket = this.deleteTicket.bind(this)
    }
    componentDidMount() {
        const token = window.localStorage.getItem('token')
        axios
            .get('http://127.0.0.1:8000/api/v1/users/current', {headers: {Authorization: 'Token ' + token}})
            .then(res => axios
                        .get('http://127.0.0.1:8000/api/v1/ordered_tickets?user=' + res.data.id,
                            {headers: {Authorization: 'Token ' + token}})
                        .then(res =>this.setState({tickets:res.data})))
    }
    deleteTicket(ticket_id)
    {
        const token = window.localStorage.getItem('token')
        axios
            .delete('http://127.0.0.1:8000/api/v1/ordered_tickets/' + ticket_id,{headers: {Authorization: 'Token ' + token}},)
            .then(axios
                    .get('http://127.0.0.1:8000/api/v1/users/current', {headers: {Authorization: 'Token ' + token}})
                    .then(res => axios
                        .get('http://127.0.0.1:8000/api/v1/ordered_tickets?user=' + res.data.id,
                            {headers: {Authorization: 'Token ' + token}})
                        .then(res =>this.setState({tickets:res.data})))
            )
        window.alert('Deleted Successfully')
    }
    renderTickets(ticket){
        return(
                  <Card key={ticket.id} border={'primary'} style={{margin:"10px"}}>
                    <Card.Img style={{height:"90%"}} variant="top" src={ticket.ticket.match.home_team.stadium.picture_url}/>
                    <Card.Body style={{textAlign:"center"}}>
                      <Card.Title><img alt={""} className={"table-icon-league"} src={ticket.ticket.match.home_team.picture_url}/>
                         <img alt={""} className={"table-icon-league"} src={"https://thumbs.dreamstime.com/b/vs-versus-letters-vector-logo-line-icon-isolated-white-background-vs-versus-symbol-confrontation-opposition-vs-versus-175695319.jpg"}/>
                          <img alt={""} className={"table-icon-league"} src={ticket.ticket.match.away_team.picture_url}/>
                      </Card.Title>
                      <Card.Text>
                          <p>{ticket.ticket.match.home_team.name} VS {ticket.ticket.match.away_team.name}</p>
                          <p>Match from the {ticket.ticket.match.round} round of the {ticket.ticket.match.home_team.league.name}</p>
                          <p>Would play in {ticket.ticket.match.home_team.stadium.name} at {ticket.ticket.match.game_date}</p>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                            <div style={{width:"10%", margin: "auto"}}>
                            <p>{ticket.amount}  X tickets</p>
                                    <Button onClick={()=> this.deleteTicket(ticket.id)} variant="danger">
                                        Cancel
                                    </Button>
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