import React from 'react';
import axios from 'axios';
import {Nav} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import {BASE_PATH} from "./request_utils";
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
                    axios.get(`${BASE_PATH}/api/v1/sign_out`, {headers: headers})
                    toast.success("Logged out")
                    this.props.handleUser({})
                    this.props.handleLogin(false)
                }
                else{
                    window.alert('You have not been signed in')
                }


        }
        render() {
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
                  <Nav.Item style={{marginLeft: 'auto'}}>
                    <Nav.Link style={{color:"whitesmoke"}} title="Log Out" onClick={this.handleSubmit}>
                      Log Out <img className={'player-table-icon'} src={'https://cdn-icons-png.flaticon.com/512/3596/3596149.png'}/>
                    </Nav.Link>
                  </Nav.Item>
            </>
        )}
    }
