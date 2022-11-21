import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import  auth  from '@react-native-firebase/auth';


function StartScreen({navigation:{navigate}})
{
  const[email, setEmail] = useState('');
  const[error, setError] = useState(false);
  const[username, setUsername]= useState('');
  const[password, setPassword] = useState('');
  const[repeatPassword, setRepeatPassword] = useState('');

  const Alertmessage = (e) => {
    Alert.alert(
            "ALERT!",
            e,
          [
            {
                text: 'OK',
            }
          ],
          console.log(e)
    )
}
  const CheckPassword= ()=>
  {
    if(password!==repeatPassword)
    {
      Alertmessage("The passwords must match")
      console.log("The passwords must match")
    }
    else{
      if(password.length===0 || username.length===0|| email.length===0 || repeatPassword.length===0)
      {
        setError(true);
      }
      else {
        setError(false);

        const registerObj = {
          email: email,
          password: password
      }
      console.log('register', registerObj)
      auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
              
              navigate('AllContent')
              console.log("registered");
          })
          .catch(err => {
              if (err.code === 'auth/email-already-in-use')
               {
                Alertmessage("Email is already taken");
                
              }
              if (err.code === 'auth/invalid-email')
               {
                Alertmessage("Invalid email");
                
              }
          })
      }
    }

    
  }

    return(

        <View style={styles.body}>
           
             <View style={styles.body}>
               <Text style={{color: "#000",
                          fontSize:30,
                          margin: 15,
                         } }>
                           Register page 
                </Text>
                <View style={{height:318,
                          width:370,
                          borderWidth:10,
                          borderColor:'#001f90',
                          backgroundColor: '#7db6f5',
                          borderRadius:10,
                          margin:12}}>
                   <TextInput style={styles.enter} placeholder="Enter Email" value={email} onChangeText={(text) => setEmail(text)} />
                   <TextInput style={styles.enter} placeholder="Enter username"  value={username} onChangeText={(text) => setUsername(text)}/>
                   <TextInput style={styles.enter} placeholder="Enter password" value={password} onChangeText={(text) => setPassword(text)}/>
                   <TextInput style={styles.enter} placeholder="Repete password" value={repeatPassword} onChangeText={(text) => setRepeatPassword(text)}/>
                </View>
                <TouchableOpacity onPress={CheckPassword}>
                                    <View style={ styles.buttonText}>
                                     <Text style={styles.textStyle}>
                                          Sign up
                                     </Text>
                                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigate('Sign in')}>
                  <View >
                    <Text style={{fontSize:15, color:"#000"}}>
                      Already have an account? Sign in!
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
    )
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        alignItems:'center',
        backgroundColor: '#e4edf7',
        justifyContent:'center'
       },

  text:{
        color: "#000",
        fontSize:25,
        margin: 15,
        borderWidth:7,
        textAlign:'center',
        borderColor:'#001f90',
        borderRadius:10,
        backgroundColor:'#bfddff'
       },
   enter:{
    height:50,
    margin:12,
    fontSize:17,
    borderWidth:2,
    borderColor:'#001f90',
    borderRadius:10
   },
   buttonText:
   {
    height:50,
    width:150,
    borderWidth:5,
    backgroundColor: '#001f90',
    borderColor:'#001f90',
    borderRadius:10
   },
   textStyle:
   {
    color:'#ffffff',
    textAlign:'center',
    fontSize:25,
   }
    
 
 });
export default StartScreen