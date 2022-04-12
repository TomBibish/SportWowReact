import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";
import {BASE_PATH} from "./request_utils";

export class LoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        axios.post(`${BASE_PATH}/api/v1/api-token-auth`, {
            username: this.state.username,
            password: this.state.password
        })
        .then(result => {
            window.localStorage.setItem("token", result.data.token)
            const token = window.localStorage.getItem('token')
            axios
            .get(`${BASE_PATH}/api/v1/users/current`, {headers: {Authorization: 'Token ' + token}})
            .then(
                res =>this.props.handleUser(res.data)
            )
            toast.success("Signed In successfully")
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
                <Modal.Title>Log in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Text>
                            <Form.Control
                                type="text" placeholder="username"
                                value={this.state.username}
                                onChange={(event) => this.setState({username: event.target.value})}/>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Text>
                            <Form.Control
                                type="password" placeholder="password"
                                value={this.state.password}
                                onChange={(event) => this.setState({password: event.target.value})}/>
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
                    Login
                </Button>
                </Modal.Footer>
                </Modal>
                </>
        )

    }
}