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
                  <Nav.Item style={{marginLeft: 'auto'}}>
                    <Nav.Link title="Log Out" onClick={this.handleSubmit}>
                      Log Out <img className={'player-table-icon'} src={'https://cdn-icons-png.flaticon.com/512/3596/3596149.png'}/>
                    </Nav.Link>
                  </Nav.Item>
        )}
    }
