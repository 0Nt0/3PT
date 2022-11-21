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
  Animated
} from 'react-native';
import { firebase } from '@react-native-firebase/database';
import  auth  from '@react-native-firebase/auth';


function AddScreen({navigation:{navigate}})
{
    const[itemName, setItemName] = useState('');
    const[itemPrice, setItemPrice] = useState('');
    const[itemDescription, setItemDescription] = useState('');

    const animatedValue= useRef(new Animated.ValueXY({
        x:500,
        y:0,
    })).current;
    useEffect(()=>{
     
    Animated.timing( animatedValue,{
        toValue:{
            x:0,
            y:0,
        },
        duration:500,
        useNativeDriver:false,

    }).start();
   },[animatedValue]);
    

    const reference = firebase
    .app()
    .database('https://rd-project-a0b23-default-rtdb.europe-west1.firebasedatabase.app/')
    .ref('/info')

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

handleSubmit = () => {

  if(itemName.length===0 || itemPrice.length===0|| itemDescription===0)
  {
    Alertmessage("There can't be empty spaces")
  }
  else{
    const newRef = reference.push();
    newRef.set({
        id: newRef.key,
        username: auth().currentUser?.email,
        itemName: itemName,
        itemPrice: itemPrice,
        itemDescription: itemDescription,
    })
    .then(() => console.log('Data inserted'))
    .catch(error=>console.log(error));
    setItemName('');
    setItemPrice('');
    setItemDescription('');
}
}



    return(
        <Animated.View style={[styles.body,{
            marginTop:animatedValue.x,
            marginLeft:animatedValue.y}]}> 
            <Text style={{color: "#000",
                          fontSize:30,
                          margin: 15,
                         } }>
                           Add a post! 
            </Text>
            <View style={{height:250,
                          width:370,
                          borderWidth:10,
                          borderColor:'#001f90',
                          backgroundColor: '#7db6f5',
                          borderRadius:10,
                          margin:12}}>
                   <TextInput style={styles.enter} placeholder="name of object" value={itemName} onChangeText={(text) => setItemName(text)} />
                   <TextInput style={styles.enter} placeholder="item description" value={itemDescription} onChangeText={(text) => setItemDescription(text)} />
                   <TextInput style={styles.enter} placeholder="price" value={itemPrice} onChangeText={(text) => setItemPrice(text)} />
                </View>
                <TouchableOpacity onPress={handleSubmit}>
                                    <View style={ styles.buttonText}>
                                     <Text style={styles.textStyle}>
                                          POST
                                     </Text>
                                    </View>
                </TouchableOpacity> 
          
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    body:{
        height: 695,
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
    borderRadius:10,

   },
   textStyle:
   {
    color:'#ffffff',
    textAlign:'center',
    fontSize:25,
    
   }
    
 
 });
export default AddScreen