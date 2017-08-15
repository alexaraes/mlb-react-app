import React, { Component } from 'react';
import request from 'superagent';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  getTeamInfo(timestamp, teamId) {
    request
    .get("https://statsapi.mlb.com/api/v1/schedule?sportId=1&date="+timestamp+"&teamId="+teamId+"&language=en")
    .end((err,resp) => {
      console.log("err:", err, "resp:", resp);
    });  
  }
  render() {
    var timestamp = moment().utc().format("YYYY-MM-DD");
    var teamId = 140;
    this.getTeamInfo(timestamp, teamId);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
