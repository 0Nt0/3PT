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
  FlatList
} from 'react-native';
import { firebase } from '@react-native-firebase/database';
import  auth  from '@react-native-firebase/auth';

function MainScreen({navigation:{navigate}})
{
    
    const reference = firebase.app().database("https://rd-project-a0b23-default-rtdb.europe-west1.firebasedatabase.app/");
    const[post,setPost]= useState([]);
    const[filtered,setFiltered]= useState(false);


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
        duration:1100,
        useNativeDriver:false,

    }).start();

    reference.ref('info')
    .on('value',(snapshot)=>
    {
        setPost([]);
        snapshot.forEach((child)=>
        {
            const newObj ={
                id: child.val().id,
                username: child.val().username,
                itemName: child.val().itemName,
                itemPrice:  child.val().itemPrice,
                itemDescription: child.val().itemDescription
            };
            setPost(emptyArray=>[...emptyArray,newObj]);
        })
    })
   },[animatedValue]);

    return(
            <Animated.View style={[styles.body,{
                                   marginTop:animatedValue.x,
                                   marginLeft:animatedValue.y}]}>
                                    {filtered===true?<TouchableOpacity onPress={()=>setFiltered(false)}>
                                    <View style={ styles.buttonText}>
                                        
                                     <Text style={{color:'#ffffff',
                                                   textAlign:'center',
                                                   fontSize:15,}}>
                                          See all posts
                                     </Text>
                                    </View>
                                     </TouchableOpacity>
                                     : <TouchableOpacity onPress={()=>setFiltered(true)}>
                                    <View style={ styles.buttonText}>
                                        
                                     <Text style={{color:'#ffffff',
                                                   textAlign:'center',
                                                   fontSize:15,}}>
                                          See my posts
                                     </Text>
                                    </View>
                                     </TouchableOpacity>}
                                    
                                     {
                                     filtered===true? 
                                      <FlatList
                                      data={post}
                                      renderItem={(item)=>{
                                        if(item.item.username===auth().currentUser?.email)
                                        return(
                                            <View style={styles.flatListStyle}>
                                                    <Text>
                                                      {item.item.username}
                                                    </Text>
                                                    <Text>
                                                      {item.item.itemName}, {item.item.itemPrice}
                                                    </Text>
                                                    <Text>
                                                      {item.item.itemDescription}
                                                    </Text>
                                                </View>
                                        )
                                      }}/>
                                      
                                     
                                     :<FlatList 
                                         data={post}
                                         renderItem={(item)=> {
                                            return(
                                                
                                                <View style={styles.flatListStyle}>
                                                    <Text>
                                                      {item.item.username}
                                                    </Text>
                                                    <Text>
                                                      {item.item.itemName}, {item.item.itemPrice}
                                                    </Text>
                                                    <Text>
                                                      {item.item.itemDescription}
                                                    </Text>
                                                </View>
                                            )
                                        }}
                                        />  }
                                    
                                       
                    

            </Animated.View>
          )

}
const styles = StyleSheet.create({
    body:{
        height: 700,
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
   flatListStyle:
   {
    height:100,
    width:370,
    borderWidth:10,
    borderColor:'#001f90',
    backgroundColor: '#7db6f5',    
    borderRadius:10,
    margin:12
   }
    
 
 });
export default MainScreen