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
                initialRouteName="consultas"
                screenOptions={{
                    drawerHideStatusBarOnOpen:true,
                    drawerStatusBarAnimation:'fade',
                    drawerStyle:{
                        backgroundColor: "#1D1136",
                        width: 240,
                    },
                    drawerContentStyle:{
                        alignContent: "center"
                    },
                    drawerLabelStyle:{
                        textAlign: 'center',
                        color: '#FFF'
                    }
                    
                }}
            >
                <Drawer.Screen name="consultas" component={Consultas} />
                <Drawer.Screen name="perfil" component={Perfil} />
            </Drawer.Navigator>
    )
}


const styles = StyleSheet.create({

});

