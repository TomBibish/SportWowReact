
import './App.css';
import React from 'react';
import { Nav, NavDropdown} from "react-bootstrap";
import {LeagueTable} from "./LeagueTable";
import {TopScorers} from "./TopScorers";
import {TopAssists} from "./TopAssists";
import {Matches} from "./Matches";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: ''}
        this.handleSelected = this.handleSelected.bind(this)
    }
        handleSelected(selectedKey) {
        console.log(`selected ${selectedKey}`)
        this.setState({selectedKey: selectedKey})
    }
    renderMainView() {
        switch (this.state.selectedKey) {
            case "leagues":
                return <LeagueTable
                    handleSelected={this.handleSelected}
                />
            case "top_scorers":
                return <TopScorers selected_key={this.state.selectedKey}/>
            case "top_assists":
                return <TopAssists selected_key={this.state.selectedKey}/>
            case "matches":
                return <Matches/>
            default:
                return null
        }
    }
    render() {
         return (
             <>
                <Nav variant="pills" onSelect={this.handleSelected}>
                  <Nav.Item>
                    <Nav.Link eventKey="1" href="#/home" disabled={'true'}>
                      <img className={'home-icon'} alt={''} src={'sport_wow.jpg'}/>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="matches"  title="Item">
                      Matches
                    </Nav.Link>
                  </Nav.Item>
                  <NavDropdown title="Teams" id="nav-dropdown" onSelect={this.handleSelected}>
                    <NavDropdown.Item eventKey="Teams"
                    >Israeli Premier League
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Leagues" id="nav-dropdown" onSelect={this.handleSelected}>
                    <NavDropdown.Item eventKey="leagues">
                        Israeli Premier League
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                 <br/>
                {this.renderMainView()}
             </>

        )
    }
}

export default App;
