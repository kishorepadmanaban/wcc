/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View,TextInput, Button, Image} from 'react-native';
import axios from 'axios'
import Home from './screens/home'
import Logo from './vivo.jpg'

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      username:"",
      password:"",
      login:null
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('login',(err,result)=>{
      this.setState({login:result})
    })
  }

  Login = () =>{

    var body={
        username:this.state.username,
        password:this.state.password
    }
    // console.error(body);

    axios.post("http://159.65.146.12:3010/api/login",body).then(response => {
      // console.error(response.data);
      if(response.data.status==="success")
      {
          AsyncStorage.setItem('login',response.data.username)
          this.setState({login:response.data.username})
      }
    }).catch(error => {
      console.log(error);
    })
  }

  Logout = () =>{
    AsyncStorage.removeItem('login')
    this.setState({login:null})
  }

  render() {
    if(this.state.login===null)
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
            <Image style={styles.logoImg}
            source={Logo}
            />
        </View>
        <Text style={styles.welcome}>Login</Text>
        <TextInput
        style={styles.username}
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
        autoFocus={true}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Username"
      />
        <TextInput
        style={styles.password}
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
        secureTextEntry={true}
        placeholder="Password"
      />
        <Button
          onPress={()=>this.Login()}
          title="Login"
          style={styles.login}
          accessibilityLabel="Learn more about this purple button"
        />     
      </View>
    );
    if(this.state.login!==null)
    return <Home logout={this.Logout}/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0072b8',
  },
  logo:{
    height:100,
    width:220
  },
  logoImg:{
    height:"100%",
    width:220
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:"white"
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
    color:"white"
  },
  username:{
    height: 40, 
    borderColor: 'white', 
    backgroundColor:"white",
    borderRadius:10,
    borderWidth: 1,
    width:"80%",
    color:"black",
    marginBottom:10,
    textAlign:"center"


  },
  password:{
    height: 40, 
    borderColor: 'white', 
    backgroundColor:"white",
    borderRadius:10,
    borderWidth: 1,
    width:"80%",
    marginBottom:10,
    color:"black",
    textAlign:"center"

  },
  login:{
    color:"#006eb2",
    padding:10,
    marginTop:"1em"
  }
});