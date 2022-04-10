import React from 'react';
import {Button, Card, CardGroup, Container} from 'react-bootstrap';
import axios from 'axios';
import {OrderTicketForm} from "./OrderTicketForm";
import {ToastContainer} from "react-toastify";
import {BASE_PATH} from "./request_utils";

export class OrderTickets extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tickets:[],
            ticket_picked:1,
            showOrderForm:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.renderTickets = this.renderTickets.bind(this)
    }
    componentDidMount() {
        const token = window.localStorage.getItem('token')
        axios
            .get(`${BASE_PATH}/api/v1/tickets`, {headers: {Authorization: 'Token ' + token}})
            .then(res =>this.setState({tickets:res.data}))
    }
    handleSubmit(ticket_id){
        this.setState({ticket_picked:ticket_id, showOrderForm:true})
    }
    renderTickets(ticket){
        return(
                  <Card className={'card'} key={ticket.id} border={'primary'}>
                    <Card.Img className={"card-image"}  style={{width:'100%',height:"80%"}} variant="top" src={ticket.match.home_team.stadium.picture_url}/>
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
                            <Button onClick={()=>this.handleSubmit(ticket.id)}>Order for {ticket.price}$</Button>
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
                <br/>
                <CardGroup style={{width:"100%"}}>
                    {ticketsObject}
                </CardGroup>
                <OrderTicketForm show={this.state.showOrderForm} onHide={() => this.setState({showOrderForm: false})}
                              ticket_id={this.state.ticket_picked}/>

            </Container>

        )
    }
}