import React from 'react';
import axios from 'axios';
import {Nav} from "react-bootstrap";
export class SignoutForm extends React.Component {
        constructor(props) {
        super(props)

        this.state = {
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
        handleSubmit() {
                const token = window.localStorage.getItem('token')
                if (token != null) {
                    const headers = {Authorization: "Token " + token}
                    window.localStorage.removeItem('token')
                    console.log('Token Removed')
                    axios.get('http://127.0.0.1:8000/api/v1/sign_out', {headers: headers})
                    window.alert('Signed Out Successfully')
                    this.props.handleUser({})
                    this.props.handleLogin(false)
                }
                else{
                    window.alert('You have not been signed in')
                }


        }
        render() {
    return(
                  <Nav.Item>
                    <Nav.Link  title="Item" onClick={this.handleSubmit}>
                      Sign Out
                    </Nav.Link>
                  </Nav.Item>
        )}
    }
