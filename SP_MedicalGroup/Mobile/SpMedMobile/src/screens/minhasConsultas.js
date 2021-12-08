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

import SituacaoConsulta from '../services/imgSituacao';

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

            // console.warn(resposta.status);

            if (resposta.status == 200) {
                // console.warn("aqui")
                const dadosAPI = resposta.data;
                // console.warn(resposta.data);
                this.setState({ listaConsultas: dadosAPI });
                // console.warn("Chegou os dados ó: " + this.state.listaConsultas)
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
                        source={require('../assets/maleta-verdeEscuro.png')}
                        style={styles.imgTitulo}
                    />
                    <Text style={styles.textTitulo}>Minhas Consultas</Text>
                </View>

                <View style={styles.main}>

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
            <View style={styles.mainInfoCard}>
                <View style={styles.dataInfo}>
                    <Text style={styles.chave}>Data da consulta: </Text>
                    <Text style={styles.valor}>{Intl.DateTimeFormat("pt-BR", {
                                                    year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric"
                                                }).format(new Date(item.dataConsulta))}</Text>
                </View>
                <View style={styles.pacInfo}>
                    <Text style={styles.chave}>Paciente: </Text>
                    <Text style={styles.valor}>{item.idPacienteNavigation.nomePaciente}</Text>
                </View>
                <View style={styles.medInfo}>
                    <Text style={styles.chave}>Medico: </Text>
                    <Text style={styles.valor}>{item.idMedicoNavigation.nomeMedico + " " + item.idMedicoNavigation.sobrenomeMedico}</Text>
                </View>
                <View style={styles.espInfo}>
                    <Text style={styles.chave}>Especialidade: </Text>
                    <Text style={styles.valor}>{(item.idMedicoNavigation.idEspecialidadeNavigation.tituloEspecialidade)}</Text>
                </View>
            </View>
            <View style={styles.addInfoCard}>
                <SituacaoConsulta situacao={item.idSituacaoNavigation.situacao1} />         
                <Text style={styles.chave}>{item.idSituacaoNavigation.situacao1}</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    pagConsultas: {
        flex: 1,
        width: '100%',
        paddingTop: '10%',
        paddingBottom:'20%',
        // flexDirection:"column",
        alignItems: "center",
        // backgroundColor:"rgba(61, 125, 169, 0.6);",
        backgroundColor:"#FFF"
    },
    titulo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "60%",
        borderBottomWidth: 1,
        borderBottomColor: "#89D9B2",
        paddingBottom: 4
    },
    textTitulo: {
        color: "#89D9B2",
        fontSize: 22,
        width: "50%",
        textAlign: "center",
        textTransform:"uppercase"
    },
    main: {
        width: "100%",
        marginTop:2
    },
    mainBodyContent: {
        width: "100%",
        paddingTop: 10,
        paddingBottom:10,
        marginBottom:10,
        // backgroundColor: "green",
        alignItems: "center"
    },
    cardConsulta: {
        width: "80%",
        marginTop: 10,
        marginBottom:10,
        paddingTop:20,
        // backgroundColor: "rgba(137, 217, 178, 1)",
        backgroundColor: "#82C0D9",
        height: 200,
        flexDirection:"row",
        borderRadius:25,
        paddingLeft:20,
        paddingBottom:20,


    },
    mainInfoCard:{
        flex:2
    },
    addInfoCard:{
        flex:1,
        alignItems:"center",
        height:"90%",
        justifyContent:"center"
    },
    chave:{
        color:"#FFF",
        fontSize:18,
        fontWeight:"bold"
    },
    valor:{
        color:"#FFF",
        fontSize:16,
    },
    dataInfo:{
        marginBottom:10,
        justifyContent:"center",
        // alignItems:"center"
    },
    pacInfo:{
        flexDirection:"row",
        marginBottom:10,
        // justifyContent:"center",
        alignItems:"center"
    },
    medInfo:{
        flexDirection:"row",
        marginBottom:10,
        // justifyContent:"center",
        alignItems:"center"
    },
    espInfo:{
        flexDirection:"row",
        marginBottom:10,
        // justifyContent:"center",
        alignItems:"center"
    },


});
