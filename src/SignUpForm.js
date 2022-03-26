import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import axios from 'axios';

export class SignUpForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            email:"",
            first_name:"",
            last_name:""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        axios.post('http://127.0.0.1:8000/api/v1/register', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name
        })
        .then(() => {
            window.alert('Signed Up')
            axios
                .post('http://127.0.0.1:8000/api/v1/api-token-auth', {
                    username: this.state.username,
                    password: this.state.password})
                .then(res=>{window.localStorage.setItem("token", res.data.token)
                    const token = window.localStorage.getItem('token')
            axios
                .get('http://127.0.0.1:8000/api/v1/users/current', {headers: {Authorization: 'Token ' + token}})
                .then(res =>this.props.handleUser(res.data))})})
        .catch(error => window.alert(error))
        this.props.onHide()
    }

    render () {
        return(
        <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
        <Modal.Title>SignUp</Modal.Title>
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
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Text>
                    <Form.Control
                        type="email" placeholder="email"
                        value={this.state.email}
                        onChange={(event) => this.setState({email: event.target.value})}/>
                </Form.Text>
            </Form.Group>
                        <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Text>
                    <Form.Control
                        type="text" placeholder="first name"
                        value={this.state.first_name}
                        onChange={(event) => this.setState({first_name: event.target.value})}/>
                </Form.Text>
            </Form.Group>
                        <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Text>
                    <Form.Control
                        type="text" placeholder="last name"
                        value={this.state.last_name}
                        onChange={(event) => this.setState({last_name: event.target.value})}/>
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
            Sign In
        </Button>
        </Modal.Footer>
        </Modal>
        )

    }
}