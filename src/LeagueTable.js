import React from 'react';
import axios from "axios";
import {Button, ButtonGroup, Table} from "react-bootstrap";
export  class LeagueTable extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            league_table: [],
        }
    }
    componentDidMount() {

        axios
            .get('http://127.0.0.1:8000/api/v1/stats/league_table?league=' +this.props.league)
            .then(res =>this.setState({league_table:res.data}))

    }
    renderTeam(team) {
        return (
            <tr>
                <td><img className={'table-icon-league'} src={team.picture} alt={''}/></td>
                <td>{team.name}</td>
                <td>{team.points}</td>
                <td>{team.goals_for}:{team.goals_against}</td>
                <td>{team.goals_diff}</td>
            </tr>
        )
    }
    render() {
        let teamObjects = this.state.league_table.map(
            this.renderTeam)
        return(
            <>
                <div className={'center'}>
                <ButtonGroup aria-label="Basic example">
                    <Button onClick={()=>this.props.handleSelected('top_scorers')}
                            variant="secondary" >
                        Top Scorers
                    </Button>
                    <Button onClick={()=>this.props.handleSelected('top_assists')}
                            variant="secondary" >
                        Top Assists
                    </Button>
                    <Button onClick={()=>this.props.handleSelected('compere_players')}
                            variant="secondary" >
                        Compare Players
                    </Button>
                </ButtonGroup>
                </div>
                <Table style={{'textAlign': 'center'}} striped bordered hover >
                      <thead>
                        <tr>
                          <th> </th>
                          <th>Team</th>
                          <th>Points</th>
                          <th>Goals</th>
                          <th>Goals Diff</th>
                        </tr>
                      </thead>
                    <tbody>
                    {teamObjects}
                    </tbody>
                </Table>
                <br/>
            </>
        )
    }
}