/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View,TextInput, Button, Image, TouchableOpacity} from 'react-native';
import axios from 'axios'
import Logo from '../vivo.jpg'

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
        status:"Busy"
    };
  }

  componentDidMount(){
    AsyncStorage.getItem('login',(err,result)=>{
        this.setState({username:result})
      })
    axios.get("http://159.65.146.12:3010/api/status").then(response => {
        this.setState({status:response.data.status})
        }).catch(error => {
        console.log(error);
        })
  }

  sendRequest = () =>{
    let body = {
        reason:this.state.reason,
        comments:this.state.comments,
        username:this.state.username,
        status:"Not Completed"
    }
    axios.post("http://159.65.146.12:3010/api/service_request",body).then(response => {
        console.log(response.data);
        if(this.state.username===response.data.username)
        {
            this.setState({comments:"",reason:""})
            alert("Service Request Send Succesfully");
        }
      }).catch(error => {
        console.log(error);
      })
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.logout}>
            <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.header}>
        <View style={styles.logo}>
            <Image style={styles.logoImg}
            source={Logo}
            />
        </View>
            <Text style={styles.headerText}>Home</Text>
        </View>
        <View style={styles.statusWrap}>
            <Text style={styles.statusHeading}>Service Engineer Status</Text>
            <Text style={styles.status}>{this.state.status}</Text>
        </View>
        <View style={styles.request}>
            <Text style={styles.requestHeading}>Send Request</Text>
            <Text style={styles.requestTitles}>Reason</Text>
            <TextInput
                style={styles.reason}
                onChangeText={(reason) => this.setState({reason})}
                value={this.state.reason}
            />            
            <Text style={styles.requestTitles}>Comments</Text>
            <TextInput
                style={styles.comments}
                multiline={true}
                onChangeText={(comments) => this.setState({comments})}
                value={this.state.comments}
            />
            <Button
                onPress={()=>this.sendRequest()}
                title="Send"
                style={styles.sendRequest}
                accessibilityLabel="Learn more about this purple button"
        />   
        </View>
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#0072b8',
  },
  logo:{
    height:"50%",
    width:100
  },
  logoImg:{
    height:"100%",
    width:100
  },
  logout:{
    padding:5,
    color:"white",
    fontSize:16
  },
  header:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#0072b8",
    minWidth:"100%",
    color:"white"
  },
  statusWrap:{
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:"whitesmoke",
    minWidth:"100%"
  },
  request:{
    flex: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:"whitesmoke",
    minWidth:"100%"
  },
  headerText: {
    fontSize: 24,
    fontWeight:"bold",
    textAlign: 'center',
    margin: 10,
    color:"white"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  statusHeading:{
    fontSize:18,
    color:"#0072b8",
    margin:5
  },
  status:{
    fontSize:24
  },
  requestHeading:{
    fontSize:18,
    color:"#0072b8",
    margin:5
  },
  requestTitles:{
    fontSize:14,
    margin:5
  },
  reason:{
    height: 40,
    fontSize:14, 
    borderColor: 'gray', 
    borderWidth: 1,
    width:200,
    borderRadius:5
  },
  comments:{
    height: 100, 
    borderColor: 'gray', 
    borderWidth: 1,
    width:200,
    borderRadius:5,
    marginBottom:10,
    justifyContent:"flex-start"
  },
  sendRequest:{
    color:"#0072b8",
    padding:10,
    marginTop:"1em",
    borderRadius:5
  }
});