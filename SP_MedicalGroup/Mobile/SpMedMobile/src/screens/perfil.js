import React, { Component } from 'react';

import {
    FlatList,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Touchable,
    TouchableOpacity
} from 'react-native';

import api from '../services/api';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Perfil extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            base64:""
        }

    }

    realizarLogout = async () =>{
        try {
            await AsyncStorage.removeItem("userToken");
            this.props.navigation.navigate('Login');
        } catch (error) {
            console.warn(error)
        }
    }

    buscaDadosStorage = async () => {
        try {
            const valorToken = await AsyncStorage.getItem("userToken");
            
            if (valorToken != null) {
                jwtDecode(valorToken).email
                this.setState({email: jwtDecode(valorToken).email})
            }
        } catch (error) {
            console.warn(error)
        }
    }
    
    componentDidMount(){
        this.buscaDadosStorage()
    }
    
    render() {
        return (
            <View style={styles.pagPerfil}>
                <View style={styles.titulo}>
                    <Image
                        source={require('../assets/User.png')}
                        style={styles.imgTitulo}
                    />
                    <Text style={styles.textTitulo}>Meu Perfil</Text>
                </View>
                <View style={styles.main}>
                    <Image 
                    source={require('../assets/iconeRedondo.png')}
                    style={styles.imgMain}
                    />
                    <View style={styles.info}>
                        <Text style={styles.chave}>Email: </Text>
                        <Text style={styles.valor}>{this.state.email}</Text>
                    </View>
                </View>
                <View style={styles.logout}>
                    <TouchableOpacity onPress={this.realizarLogout}>
                    <Text style={styles.sairTxt}>Sair</Text>
                    </TouchableOpacity>
                </View>

            </View>


        )
    };

};

const styles = StyleSheet.create({
    pagPerfil: {
        flex: 1,
        width: '100%',
        paddingTop: '10%',
        // flexDirection:"column",
        alignItems: "center",
        backgroundColor: "linear-gradient(180deg, rgba(139, 217, 217, 0.3) 0%, rgba(135, 206, 217, 0.234) 6.77%, rgba(130, 192, 217, 0.3) 52.08%, rgba(130, 192, 217, 0.228) 100%);"
    },
    titulo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "60%",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(137, 217, 178, 0.8)",
        paddingBottom: 4
    },
    textTitulo: {
        color: "rgba(137, 217, 178, 0.8);",
        fontSize: 22,
        width: "50%",
        textAlign: "center"
    },
    main: {
        flex: 4,
        width:"100%",
        alignItems:"center",
        marginTop:10,
        height:"80%",
        justifyContent:"space-around"
    },
    imgMain:{
        width:160,
        height:160,
    },
    info:{
        height:"40%"
    },
    chave:{
        color:"#FFF",
        fontSize:26,
        fontWeight:"bold",
    },
    valor:{
        color:"#82C0D9",
        fontSize:18,
    },
    logout: {
        flex: 1,
        width: "60%",
        borderTopWidth: 1,
        borderTopColor: "rgba(137, 217, 178, 0.8)",
        alignItems: "center",
    },
    sairTxt: {
        fontSize: 28,
        lineHeight:38,
        letterSpacing:2,
        color:"rgba(137, 217, 178, 0.8)",
        marginTop:4
    }
});

export default Perfil;