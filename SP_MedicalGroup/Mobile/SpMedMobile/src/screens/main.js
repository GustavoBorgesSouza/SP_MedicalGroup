import React, { Component } from 'react';

import {
    FlatList,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();


import Consultas from './minhasConsultas';
import Perfil from './perfil';

export default function Main() {
    return (
            <Drawer.Navigator
                initialRouteName="Consultas"
                screenOptions={{
                    headerShown:false,
                    drawerHideStatusBarOnOpen:true,
                    drawerStatusBarAnimation:'slide',
                    drawerActiveBackgroundColor:"rgba(130, 192, 217, 0.6);",
                    drawerInactiveBackgroundColor:"rgba(105, 193, 156, 1);",
                    drawerStyle:{
                        backgroundColor: "rgba(105, 193, 156, 1);",
                        width:"60%",
                    },
                    drawerContentStyle:{
                        alignContent: "center"
                    },
                    drawerLabelStyle:{
                        textAlign: 'center',
                        color: '#FFF',
                        fontSize:20
                    }
                    
                }}
            >
                <Drawer.Screen name="Consultas" component={Consultas} />
                <Drawer.Screen name="Perfil" component={Perfil} />
            </Drawer.Navigator>
    )
}


const styles = StyleSheet.create({

});

