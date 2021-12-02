import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'roberto.possarle@spmedicalgroup.com.br',
            senha: '128976'
        };
    }

    realizarLogin = async () => {

        const resposta = await api.post('/login', {
            email: this.state.email,
            senha: this.state.senha
        });

        const token = resposta.data.token;
        await AsyncStorage.setItem('userToken', token);

        if (resposta.status == 200) {
            this.props.navigation.navigate('Main');
            console.warn('logou');
        }
        console.warn(token);


    };

    render() {
        return (
            <View style={styles.pagLogin}>
                <View style={styles.Logo}>
                    <Image
                        source={require('../assets/LogoCompleto.png')}
                        style={styles.ImgLogin}
                    />
                </View>
                <View style={styles.campoInputs}>
                    <TextInput 
                    style={styles.input}
                    placeholder="Email:"
                    keyboardType="email-address"
                    onChangeText={email => this.setState({email}) }
                    />

                    <TextInput 
                    style={styles.input}
                    placeholder="Senha:"
                    keyboardType="default"
                    onChangeText={senha => this.setState({senha}) }
                    />
                </View>
                <View style={styles.campoLogin}>
                    <TouchableOpacity style={styles.btnLogin} onPress={this.realizarLogin}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pagLogin:{
        flex:1,
        width:'100%',
        paddingTop:'20%',
        alignItems:"center",
        backgroundColor:"linear-gradient(180deg, rgba(139, 217, 217, 0.3) 0%, rgba(135, 206, 217, 0.234) 6.77%, rgba(130, 192, 217, 0.3) 52.08%, rgba(130, 192, 217, 0.228) 100%)"
    },
    Logo:{
        flex:1,
        alignItems:'center',
        // backgroundColor:'red'
    },
    campoInputs:{
        flex:2,
        alignItems:"center",
        paddingTop:'20%',
        width:'100%',
        // backgroundColor:'blue'
    },
    input:{
        width:'80%',
        marginBottom:50,
        paddingLeft:20,
        placeholderTextColor:"rgba(255, 255, 255, 0.5)",
        backgroundColor: 'rgba(61, 125, 169, 0.6)',
        borderRadius:2
    },
    campoLogin:{
        flex:1,
        alignItems:'center',
        width: '100%',
        // backgroundColor:'green'
    },
    btnLogin:{
        width:'80%',
        height:50,
        backgroundColor:'rgba(105, 193, 156, 0.8)',
        borderRadius:6,
        alignItems:"center",
        justifyContent:"center"
    },
    btnText:{
        fontSize: 28,
        lineHeight:38,
        letterSpacing:1,
        color:"#FFF"
    }

});