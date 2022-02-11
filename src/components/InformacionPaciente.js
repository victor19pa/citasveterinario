import React from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { formatearFecha } from '../helpers'

const InformacionPaciente = ({paciente, setModalPaciente, setPaciente}) => {
    console.log("paciente: ", paciente)
    return (
        <SafeAreaView style={styles.contenedor}>
            <Text style={styles.titulo}>Informacion {' '}
                <Text style={styles.tituloBold}>Paciente</Text>
            </Text>

            <View>
                <Pressable
                    onLongPress={() => {
                        setPaciente({})
                        setModalPaciente(false)
                    }}
                    style={styles.btnCerrar}
                >
                    <Text
                        style={styles.btnCerrarTxt}
                    >Cerrar</Text>
                </Pressable>
            </View>
            <View
                style={styles.contenido}
            >   
                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre: </Text>
                    <Text style={styles.valor}>{paciente.paciente}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Propietario: </Text>
                    <Text style={styles.valor}>{paciente.propietario}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Email: </Text>
                    <Text style={styles.valor}>{paciente.email}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Telefono: </Text>
                    <Text style={styles.valor}>{paciente.telefono}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha Alta: </Text>
                    <Text style={styles.valor}>{formatearFecha(paciente.fecha)}</Text>
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Sintomas: </Text>
                    <Text style={styles.valor}>{paciente.sintomas}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor: '#F59E0B',
        flex: 1,
    },
    titulo:{
        textAlign: 'center',
        fontSize: 30,
        color: '#FFF',
        marginTop: 30,
        fontWeight: '500'
    },
    tituloBold:{
        fontWeight: '900'
    },
    btnCerrar:{
        marginVertical: 30,
        backgroundColor: '#E06900',
        marginHorizontal: 40,
        padding: 15,
        borderRadius: 12
    },
    btnCerrarTxt:{
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase'
    },
    contenido:{
        backgroundColor: '#FFF',
        marginHorizontal: 40,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 15,
    },
    campo:{
        marginBottom: 10
    },
    label:{
        textTransform: 'uppercase',
        color: '#374151',
        fontWeight: '600',
        fontSize: 12
    },
    valor:{
        fontWeight: '700',
        fontSize: 20,
        color: '#334155'
    }
})

export default InformacionPaciente