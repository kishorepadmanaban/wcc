import React, { Component } from 'react';
import axios from 'axios';
import "../style/dashboard.css";
import date from "../scripts/date"
import Image from '../vivo.jpg'

class Dashboard extends Component {
  constructor(props){
      super(props);
      this.state={
        users:{},
        status:"",
        fromdate:date.stockdate,
        todate:date.date1
      }
  }
  componentDidMount(){
    if(localStorage.getItem("login")==="admin")
    {
        this.props.login("admin")
    }
  }


  handleSubmit  =(e) =>{
    e.preventDefault();
    let body={
        username:this.state.username,
        password:this.state.password
    }
    axios.post("http://159.65.146.12:3010/api/login",body).then(response => {
      console.log(response.data);
      if(response.data.status==="success")
      {
          localStorage.setItem('login','admin')
            this.props.login("admin")

      }
    }).catch(error => {
      console.log(error);
    })
    }



  handleChange = (event) =>{
      this.setState({[event.target.name]:event.target.value})
  }



  render() {
    return (
      <div className="App">
        <div>
            <div id="logo">
                <img src={Image} height="50px" alt="logo"/>
            </div>

        </div>
          <div id="status_wrap">
              <h3>Login</h3>
              <div  id="user_input_wrap">
                <p>Username</p>
                <input id="status_input" name="username" type="text" onChange={this.handleChange} value={this.state.username}/>
                <p>Password</p>
                <input id="status_input" name="password" type="text" onChange={this.handleChange} value={this.state.password}/>
                
                <div onClick={this.handleSubmit} id="status_submit">
                    Submit
                </div>
              </div>
          </div>
    </div>
    );
  }
}

export default Dashboard;
