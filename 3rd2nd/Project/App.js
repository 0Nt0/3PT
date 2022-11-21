/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/*import React, { cloneElement } from 'react';*/
import React, { Component,useEffect, useRef } from 'react';
/*import type {Node} from 'react';*/
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StartScreen from './screens/StartScreen';
import MainScreen from './screens/MainScreen';
import SignInScreen from './screens/SignInScreen';
import AddScreen from './screens/AddScreen';
import DeleteScreen from './screens/DeleteScreen';
import  auth  from '@react-native-firebase/auth';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabScreens() {

  return (
    <Tab.Navigator >
      <Tab.Screen name="All Content" component={MainScreen}
             options={{tabBarIcon: ({  }) => (
                                                      <Animated.Image 
                                                            style={{
                                                                    width:25,
                                                                    height:25
                                                                   }
                                                                  }
                                                       source={require('./pngs/AllContentPNG.png')}
                                                       
                                                       />
                                                       
                                                  ),
                      tabBarLabel: 'Home',
                      headerStyle:{
                        backgroundColor:'#001f90',
                        },
                        headerTintColor:'#ffffff',
                        headerTitleStyle:{
                        fontWeight: 'normal',
                        },
                        headerTitleAlign:'center'
                    }}/>
       <Tab.Screen name="Add post" component={AddScreen}
             options={{tabBarIcon: ({ color }) => (
                                                      <Image
                                                            style={{
                                                                    width:25,
                                                                    height:25
                                                                   }}
                                                       source={require('./pngs/AddCreenPNG.png')}
                                                       />
                                                  ),
                      tabBarLabel: 'Add post',
                      headerStyle:{
                        backgroundColor:'#001f90',
                        },
                        headerTintColor:'#ffffff',
                        headerTitleStyle:{
                        fontWeight: 'normal',
                        },
                        headerTitleAlign:'center'
                    }}/> 
        <Tab.Screen name="Delete post" component={DeleteScreen}
             options={{tabBarIcon: ({ color }) => (
                                                      <Image
                                                            style={{
                                                                    width:25,
                                                                    height:25
                                                                   }}
                                                       source={require('./pngs/DeleteScreenPNG.png')}
                                                       />
                                                  ),
                      tabBarLabel: 'Delete',
                      headerStyle:{
                        backgroundColor:'#001f90',
                        },
                        headerTintColor:'#ffffff',
                        headerTitleStyle:{
                        fontWeight: 'normal',
                        },
                        headerTitleAlign:'center'
                    }}/> 
                    
    </Tab.Navigator>
  )
}


class App extends Component {

  render(){
    
    

  return (
     
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Main Screen"
                    component={StartScreen}
                    options={styles.optionsForStack}/>
      <Stack.Screen name="AllContent"
                    component={TabScreens}
                    options={{headerShown:false}}
                    />
      <Stack.Screen name="Sign in"
                    component={SignInScreen}
                    options={styles.optionsForStack}/>
    </Stack.Navigator>
    </NavigationContainer>
    
  );
  }
};

const styles = StyleSheet.create({
   optionsForStack:{
    headerStyle:{
    backgroundColor:'#001f90',
    },
    headerTintColor:'#ffffff',
    headerTitleStyle:{
    fontWeight: 'normal',
    },
    headerTitleAlign:'center' 

   }
   

});

export default App;
