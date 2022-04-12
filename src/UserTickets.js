import React from 'react';
import {Button, Card, CardGroup, Container} from 'react-bootstrap';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";
import {BASE_PATH} from "./request_utils";
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
            .get(`${BASE_PATH}/api/v1/users/current`, {headers: {Authorization: 'Token ' + token}})
            .then(res => axios
                        .get(`${BASE_PATH}/api/v1/ordered_tickets?user=` + res.data.id,
                            {headers: {Authorization: 'Token ' + token}})
                        .then(res =>this.setState({tickets:res.data})))
    }
    deleteTicket(ticket_id)
    {
        const token = window.localStorage.getItem('token')
        axios
            .delete(`${BASE_PATH}/api/v1/ordered_tickets/` + ticket_id,{headers: {Authorization: 'Token ' + token}},)
            .then(axios
                    .get(`${BASE_PATH}/api/v1/users/current`, {headers: {Authorization: 'Token ' + token}})
                    .then(res => axios
                        .get(`${BASE_PATH}/api/v1/ordered_tickets?user=` + res.data.id,
                            {headers: {Authorization: 'Token ' + token}})
                        .then(res =>this.setState({tickets:res.data})))
            )
        toast.success('Deleted Successfully')
    }
    renderTickets(ticket){
        return(
                  <Card key={ticket.id} border={'primary'} style={{margin:"10px"}} className={'card'}>
                    <Card.Img className={"card-image"} style={{height:"90%"}} variant="top" src={ticket.ticket.match.home_team.stadium.picture_url}/>
                    <Card.Body style={{textAlign:"center"}}>
                      <Card.Title><img alt={""} className={"table-icon-league"} src={ticket.ticket.match.home_team.picture_url}/>
                         <img alt={""} className={"table-icon-league"} src={"https://thumbs.dreamstime.com/b/vs-versus-letters-vector-logo-line-icon-isolated-white-background-vs-versus-symbol-confrontation-opposition-vs-versus-175695319.jpg"}/>
                          <img alt={""} className={"table-icon-league"} src={ticket.ticket.match.away_team.picture_url}/>
                      </Card.Title>
                      <Card.Text>
                          <p>{ticket.ticket.match.home_team.name} VS {ticket.ticket.match.away_team.name}</p>
                          <p>Match from the {ticket.ticket.match.round} round of the {ticket.ticket.match.home_team.league.name}</p>
                          <p>Would play in {ticket.ticket.match.home_team.stadium.name} at {ticket.ticket.match.game_date}</p>
                          <p>{ticket.amount}  X tickets</p>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                            <div className={'center'}>
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
                <br/>
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <CardGroup style={{width:"100%"}}>
                    {ticketsObject}
                </CardGroup>
            </Container>

        )
    }
}