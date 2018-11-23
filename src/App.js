import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import Login from "./screens/login"
import Dashboard from "./screens/dashboard"
import User from "./screens/user"
import "./style/dashboard.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      login:""
    }
}

  Logout = () =>{
    this.setState({login:""})
    localStorage.removeItem("login")
  }
  
  Login =() =>{
    this.setState({login:"admin"})
    this.props.history.push("/dashboard");
  }

  render() {
    if(this.state.login==="")
    return <Login login={this.Login}/>
    if(this.state.login==="admin")
    return (
      <div className="App">
          <div id="logout" onClick={this.Logout}>Logout</div>
          <BrowserRouter>
          <div>
            <Route exact path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/user" component={User} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
