import React from 'react';

import {
    Image,
    StyleSheet
} from 'react-native';

export default function SituacaoConsulta(situacao){

    switch (situacao.situacao) {
        case "Agendada":
            return (
                <Image
                    source={require("../assets/calendar-plus-regular.png")}
                    style={styles.imgSituacao}
                />
            )
        case 'Realizada':
            return (
                <Image
                    source={require("../assets/calendar-check-regular.png")}
                    style={styles.imgSituacao}
                />
            )
        case "Cancelada":
            return (
                <Image
                    source={require("../assets/calendar-times-regular.png")}
                    style={styles.imgSituacao}
                />
            )

        default:
            return(
                <Image
                    source={require("../assets/Maleta-verde.png")}
                    style={styles.imgSituacao}
                />
            )
    }
}

const styles = StyleSheet.create({
    imgSituacao:{

    }
})