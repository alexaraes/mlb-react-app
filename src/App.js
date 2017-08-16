import React, { Component } from 'react';
import request from 'superagent';
import moment from 'moment';
import logo from './logo.svg';
import GameDay from './components/GameDay.js';
import './App.css';

var date = "";

class App extends Component {
  constructor() {
    super();

    this.state = {
      game: [],
      teamId: 140,
      awayTeam: '',
      homeTeam: '',
      venue: '',
      error: ''
    }
    this.getTeamInfo = this.getTeamInfo.bind(this);
  }

  componentDidMount() {
    this.getTeamInfo(this.state.teamId);
    console.log(this.state.game);
  }

  getTeamInfo(teamId) {
    var timestamp = moment().utc().format("YYYY-MM-DD");

    request
    .get("https://statsapi.mlb.com/api/v1/schedule?sportId=1&date="+timestamp+"&teamId="+teamId+"&language=en")
    .end((err,resp) => {
      if(err) {
        this.setState({
          error: err
        })
      }
      else{
        if(resp.body.dates[0].games.length > 0) {
          this.setState({
            game: resp.body.dates[0].games[0].gameDate,
            homeTeam: resp.body.dates[0].games[0].teams.home.team.name,
            awayTeam: resp.body.dates[0].games[0].teams.away.team.name,
            venue: resp.body.dates[0].games[0].venue.name,
          })
          console.log('SUCCESS:', resp.body.dates[0].games);
        }
        else {
          this.setState({
            error: 'No games today!'
          })
        }
      }
    });  
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          {this.state.homeTeam} vs {this.state.awayTeam}
        </div>
        <div className="app-header">
          @ {this.state.venue}
        </div>
      </div>
    );
  }
}

export default App;
