import React, { Component } from 'react';
import axios from 'axios';
import "../style/dashboard.css";
import date from "../scripts/date"
import moment from "moment-timezone"
import {NavLink} from 'react-router-dom'
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

    this.getServiceRequestList();

  }

  getServiceRequestList = () =>{
    var date = {
        "fromdate":this.state.fromdate,
        "todate":this.state.todate,
      }

    var params = Object.keys(date)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(date[key]))
    .join("&")
    .replace(/%20/g, "+");

    axios.get("http://159.65.146.12:3010/api/user?"+params).then(response => {
        console.log(response.data);
        this.setState({users:response.data})
      }).catch(error => {
        console.log(error);
      })
  }

  handleSubmit  =(e) =>{
    e.preventDefault();
    let body={
        username:this.state.username,
        password:this.state.password
    }
    axios.post("http://159.65.146.12:3010/api/user",body).then(response => {
      console.log(response.data);
      this.setState({users:response.data})
      alert("User Created");
    }).catch(error => {
      console.log(error);
    })
    }

deleteUser = (e,id) => {
    e.preventDefault();
    axios.delete("http://159.65.146.12:3010/api/user/"+id).then(response => {
        console.log(response.data);
        this.setState({users:response.data})
        alert("User Deleted");
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
            <div id="header">
                <NavLink activeStyle={{borderBottom:"solid 2px white"}} to="/dashboard" id="navitem">
                    Dashboard
                </NavLink>
                <NavLink activeStyle={{borderBottom:"solid 2px white"}} to="/user" id="navitem">
                    User
                </NavLink>
            </div>
        </div>
          <div id="status_wrap">
              <h3>Create User</h3>
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

        <h3>Users</h3>
        {Object.values(this.state.users).map((value,index)=>
          <div key={index} id="list">
            <div id="listWrap">
                <div id="date">
                    <div id="title">Date</div>
                    <div>{moment(value.date).format("DD-MM-YYYY HH:mm")}</div>
                </div>
                <div id="username">
                    <div id="title">Username</div>
                    <div>{value.username}</div>
                </div>
                <div id="password">
                    <div id="title">Password</div>
                    <div>{value.password}</div>
                </div>
                <div onClick={(e)=>{this.deleteUser(e,value._id)}} id="close">X</div>
            </div>
          </div>
        )}
    </div>
    );
  }
}

export default Dashboard;
