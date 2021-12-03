import React, { Component } from 'react';

import {
    FlatList,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';

import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Consultas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: []
        }
    }

    buscarConsultas = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");

            const resposta = await api.get("/consultas/minhas", {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            console.warn(resposta.status);

            if (resposta.status == 200) {
                console.warn("aqui")
                const dadosAPI = resposta.data;
                 console.warn(resposta.data);
                 this.setState({ listaConsultas: dadosAPI });
                console.warn("Chegou os dados ó: " + this.state.listaConsultas)
            }

        } catch (error) {
            console.warn(error);
        }
    };

    componentDidMount() {
        this.buscarConsultas()
    }

    render() {
        return (


            <View style={styles.pagConsultas}>
                <View style={styles.titulo}>
                    <Image
                        source={require('../assets/Maleta-verde.png')}
                        style={styles.imgTitulo}
                    />
                    <Text style={styles.textTitulo}>Minhas Consultas</Text>
                </View>

                <View style={styles.main}>

                    <View>

                    </View>
                    <FlatList
                        contentContainerStyle={styles.mainBodyContent}
                        data={this.state.listaConsultas}
                        keyExtractor={item => item.idConsulta}
                        renderItem={this.renderItem}
                    />

                </View>

            </View>


        )
    };

    renderItem = ({ item }) => (
        <View style={styles.cardConsulta}>
            <Text>{item.idMedicoNavigation.nomeMedico}</Text>
        </View>
    )
};


const styles = StyleSheet.create({
    pagConsultas: {
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
    main:{
        width:"'100%"
    },
    mainBodyContent:{
        width:"100%",
        paddingTop:10,
        backgroundColor:"green"
    },
    cardConsulta: {
        width: "80%",
        backgroundColor: "blue",
        height: 200
    }

});
