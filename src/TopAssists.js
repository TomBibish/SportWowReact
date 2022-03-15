import React from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";
export  class TopAssists extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            top_assists: [],
        }
    }
    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/v1/stats/assists_leader?league=' + this.props.league)
            .then(res =>this.setState({top_assists:res.data}))
        console.log('top_assists' + this.state.top_assists)

    }
    renderPlayer(player) {
        return (
            <tr>
                <td><img className={'table-icon'} src={player.picture} alt={''}/></td>
                <td>{player.name}</td>
                <td>{player.team}</td>
                <td>{player.assists}</td>
            </tr>
        )
    }
    render() {
        let playersObjects = this.state.top_assists.map(
            this.renderPlayer
        )
        return(
            <>
                <Table style={{'textAlign': 'center'}} striped bordered hover>
                      <thead>
                        <tr>
                          <th> </th>
                          <th>Name</th>
                          <th>Team</th>
                          <th>Assists</th>
                        </tr>
                      </thead>
                    <tbody>
                    {playersObjects}
                    </tbody>
                </Table>
                <br/>
            </>
        )
    }
}