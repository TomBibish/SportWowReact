import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";
import {BASE_PATH} from "./request_utils";


export class OrderTicketForm extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            amount:0,
            user:{}
        }


        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        const token = window.localStorage.getItem('token')
        axios
            .get(`${BASE_PATH}/api/v1/users/current`, {headers: {Authorization: 'Token ' + token}})
            .then(res =>this.setState({user:res.data}))
    }

    handleSubmit() {
        axios.post(`${BASE_PATH}/api/v1/ordered_tickets`, {ticket:this.props.ticket_id,
            user:this.state.user.id,
            amount:this.state.amount
        })
        .then(() => {
            toast.success(this.state.amount + ' tickets ordered')
        })
        .catch(error => window.alert(error))
        this.props.onHide()
    }

    render () {
        return(
            <>
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
            <Modal show={this.props.show} onHide={this.props.onHide}>
            <Modal.Header closeButton>
            <Modal.Title>Purchase Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Text>
                        <Form.Control
                            type="text" placeholder="amount"
                            value={this.state.amount}
                            aria-valuemax={10}
                            onChange={(event) => this.setState({amount: event.target.value})}/>
                    </Form.Text>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>
                Cancel
            </Button>
            <Button variant="primary"
                onClick={this.handleSubmit}>
                Order
            </Button>
            </Modal.Footer>
            </Modal>
            </>
        )
    }
}