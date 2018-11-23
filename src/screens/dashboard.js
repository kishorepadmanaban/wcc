import React, { Component } from 'react';
import axios from 'axios';
import "../style/dashboard.css";
import date from "../scripts/date"
import csv from "../scripts/csv"
import moment from "moment-timezone"
import {NavLink} from 'react-router-dom'
import Image from '../vivo.jpg'

class Dashboard extends Component {
  constructor(props){
      super(props);
      this.state={
        service_requests:{},
        status:"",
        fromdate:date.stockdate,
        todate:date.todate
      }
  }
  componentDidMount(){

    this.getServiceRequestList();

    axios.get("http://159.65.146.12:3010/api/status").then(response => {
    console.log(response.data);
    this.setState({status:response.data.status})
    }).catch(error => {
    console.log(error);
    })
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

    axios.get("http://159.65.146.12:3010/api/service_request?"+params).then(response => {
        console.log(response.data);
        this.setState({service_requests:response.data})
      }).catch(error => {
        console.log(error);
      })
  }



  handleChange = (event) =>{
      this.setState({[event.target.name]:event.target.value})
  }

  handleList = () =>{

  }

  handleStatus  =(e,id) =>{
      e.preventDefault();
      let body={
          status:this.state.status
      }
      axios.post("http://159.65.146.12:3010/api/status/",body).then(response => {
        console.log(response.data);
        this.setState({status:response.data.status})
        alert("Status Changed");
      }).catch(error => {
        console.log(error);
      })
  }

  changeServiceRequestStatus  =(event,id) =>{
    event.preventDefault();
    let body={
        status:event.target.value
    }
    axios.put("http://159.65.146.12:3010/api/service_request_status/"+id,body).then(response => {
      console.log(response.data);
      this.setState({service_requests:response.data})
      alert("Service Request Status Changed");
    }).catch(error => {
      console.log(error);
    })
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
                <NavLink activeStyle={{borderBottom:"solid 2px white"}} to="user" id="navitem">
                    User
                </NavLink>
            </div>
        </div>

          <div id="status_wrap">
              <div id="status_title">Status</div>
              <div  id="status_input_wrap">
                <input id="status_input" name="status" type="text" onChange={this.handleChange} value={this.state.status}/>
                <div onClick={this.handleStatus} id="status_submit">
                    Submit
                </div>
              </div>
          </div>
          <div id="date">
            <div id="date_title">
                Date
            </div>
            <div  id="date_input_wrap">
                <div>From:</div>
                <input type="date" id="fromdate" name="fromdate" onChange={this.handleChange} value={this.state.fromdate}/>
                <div>To:</div>
                <input type="date" id="todate" name="todate" onChange={this.handleChange} value={this.state.todate}/>
                <div id="date_submit" onClick={this.getServiceRequestList}>Go</div>
            </div>
            <div id="excel_submit" onClick={()=>{csv.export("Excel.csv")}}>
                Download Excel
            </div>
          </div>
          <div id="table">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Username</th>
                        <th>Reason</th>
                        <th>Comments</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {Object.values(this.state.service_requests).map((value,index)=>
                    <tr key={index}>
                        <td>{moment(value.date).format("DD-MM-YYYY HH:mm:ss")}</td>
                        <td>{value.username}</td>
                        <td>{value.reason}</td>
                        <td>{value.comments}</td>
                        <td>{value.status}</td>
                    </tr>
                )}
                </tbody>
            </table>
          </div>
        {Object.values(this.state.service_requests).map((value,index)=>
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
                <div id="reason">
                    <div id="title">Reason</div>
                    <div>{value.reason}</div>
                </div>
                <div id="comments">
                    <div id="title">Comments</div>
                    <div>{value.comments}</div> 
                </div>
                <div id="status">
                    <div id="title">Status</div>
                    <div>
                        <select onChange={(e)=>this.changeServiceRequestStatus(e,value._id)} value={value.status}>
                            <option value="Not Completed">Not Completed</option>
                            <option value="In Process">In Progress</option>
                            <option value="Hold">Hold</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>
          </div>
        )}
    </div>
    );
  }
}

export default Dashboard;
