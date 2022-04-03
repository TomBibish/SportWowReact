import React from 'react';
import axios from "axios";
import {Button, Container, Table} from "react-bootstrap";
import {useLocation} from "react-router-dom";
export  class LeagueTable extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            league_table: [],
        }
    }
    componentDidMount() {

        axios
            .get('http://127.0.0.1:8000/api/v1/stats/league_table?league=' +this.props.location.pathname.split('/')[2])
            .then(res =>this.setState({league_table:res.data}))

    }
    renderTeam(team) {
        return (
            <tr className={'blue-tr'}>
                <td><a href={'/team/' + team.name}> <img className={'table-icon-league'} src={team.picture} alt={''}/></a></td>
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
            <Container>
                <div className={'center-buttons'}>
                    <Button href={'/league/' + this.props.location.pathname.split('/')[2] + '/top_scorers'}
                             className={'blue-button'} style={{margin:"5px"}}>
                        Top Scorers
                    </Button>
                    <Button style={{margin:"5px"}} href={'/league/' + this.props.location.pathname.split('/')[2] + '/compare_players'}
                            className={'blue-button'}>
                        Compare Players
                    </Button>
                    <Button style={{margin:"5px"}} href={'/league/' + this.props.location.pathname.split('/')[2] + '/top_assists'}
                            className={'blue-button'}>
                        Top Assists
                    </Button>
                </div>
                <br/>
                <Table  style={{'textAlign': 'center', 'border': "#7A91B1",}}  bordered hover>
                      <thead>
                        <tr className={'blue-tr-head'}>
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
            </Container>
        )
    }
}
export const WrappedLeagueTable = props => {

    const location = useLocation()
    console.log(location)
    return <LeagueTable location={location} {...props} />
  }