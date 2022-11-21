import React, {useState,useEffect, useRef} from 'react';
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
  Alert,
  Animated,
} from 'react-native';
import  auth  from '@react-native-firebase/auth';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage  from '@react-native-async-storage/async-storage';

function SignInScreen ({navigation:{navigate}})
{
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [isSelected, setSelection] = useState(false);

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(user => {
          if (user !== null) {
              navigate('AllContent')
              console.log("you were signed in")
          } else {
              navigate('Sign in')
          }
      })
      return subscriber

  })
 /* const GetStatus =async(selected) =>{
    
      try{
        await AsyncStorage.setItem("myCheckbox",JSON.stringify(selected))
      }catch(e){
        console.log(e)
      }
      
  }*/

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
    if(password.length===0 || email.length===0)
      {
        Alertmessage("There can't be empty spaces")
      }
      else
      {
        auth().signInWithEmailAndPassword(email,password)
              .then(()=>{
                            navigate('AllContent')
                            console.log("OKI")
                        } 
                   ).catch(error=>{
                                    Alertmessage("Error while signing in")
                                  } 
                          )
      }
      

  }

    return(
        <View style={styles.body}>
           <View style={styles.body}>
               <Text style={{color: "#000",
                          fontSize:30,
                          margin: 15,
                         } }>
                           Sign in page
                </Text>
                <View style={{height:170,
                          width:370,
                          borderWidth:10,
                          borderColor:'#001f90',
                          backgroundColor: '#7db6f5',
                          borderRadius:10,
                          margin:12}}>
                   <TextInput style={styles.enter} placeholder="Enter Email" value={email} onChangeText={(text) => setEmail(text)} />
                   <TextInput style={styles.enter} placeholder="Enter password" value={password} onChangeText={(text) => setPassword(text)}/>
                </View>
                <TouchableOpacity onPress={CheckPassword}>
                                    <View style={ styles.buttonText}>
                                     <Text style={styles.textStyle}>
                                          Sign in
                                     </Text>
                                    </View>
                </TouchableOpacity> 
                
                
                
        </View>
        </View>
    )
}
/*<Text style={{color: "#000",
                              fontSize:20}}>
                                  Would you like to stay loged in?
                </Text>
<CheckBox value={isSelected}
                          onValueChange={GetStatus(isSelected)}/>
*/
const styles = StyleSheet.create({
    body:{
        height: 780,
        width:395,
        alignItems:'center',
        backgroundColor: '#e4edf7',
        justifyContent:'center',
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
export default SignInScreen
