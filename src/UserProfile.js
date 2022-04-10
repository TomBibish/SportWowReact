import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form'
import {Button} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import {BASE_PATH} from "./request_utils";

export class UserProfile extends React.Component {

        constructor(props) {
        super(props);
        this.state = {
            user_profile: {},
            teams:[]
        }
        this.renderTeam = this.renderTeam.bind(this)
    }
     componentDidMount() {
         const token = window.localStorage.getItem('token')
         axios
            .get(`${BASE_PATH}/api/v1/teams`)
            .then(res =>this.setState({teams:res.data}))
         if (token) {
             axios
                 .get(`${BASE_PATH}/api/v1/user_profile/current`, {headers: {Authorization: 'Token ' + token}})
                 .then(res => this.setState({
                         user_profile: res.data
                     }
                 ))
         }
     }
     updateUserProfile(profile)
     {
         const token = window.localStorage.getItem('token')
         if(token)
         {
             axios
            .put(`${BASE_PATH}/api/v1/user_profile/current`, {profile},{headers: {Authorization: 'Token ' + token}})
            .then(res => this.setState({
                user_profile: res.data}
            )
            )
         }
         toast.success('Updated Successfully')
     }
     renderTeam(team){
            return(
             <option value={team.name}>{team.name}</option>
            )
     }
     render() {
            let teamsObjects = this.state.teams.map(this.renderTeam)
            return(
                <Container>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                    <h1 className={'the-title'}>User Profile</h1>
                    <div style={{width:"50%"}} className={"center"}>
                        <Form.Group className="mb-3">
                            <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control value={this.state.user_profile.city}
                                          onChange={(event) =>
                                          this.setState({user_profile:{ ...this.state.user_profile, city: event.target.value}})}/>
                          </Form.Group>
                         <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={this.state.user_profile.address}
                                          onChange={(event) =>
                                          this.setState({user_profile:{ ...this.state.user_profile, address: event.target.value}})}/>
                          </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Favorite Team</Form.Label>
                            <Form.Select value={this.state.user_profile.favorite_team}
                            onChange={(event) =>
                                          this.setState({user_profile:{ ...this.state.user_profile,
                                                  favorite_team: event.target.value}})}>
                                <option>Pick favorite team</option>
                                {teamsObjects}
                            </Form.Select>
                          </Form.Group>
                            <div className={"center"}>
                              <Button type="submit"
                                      onClick={()=>this.updateUserProfile(this.state.user_profile)}>
                                  <img className={'player-table-icon'} src={'https://img.icons8.com/external-becris-lineal-becris/2x/external-edit-mintab-for-ios-becris-lineal-becris.png'}/>Update
                              </Button>
                            </div>
                      </Form.Group>
                    </div>
                </Container>
            )
     }
}