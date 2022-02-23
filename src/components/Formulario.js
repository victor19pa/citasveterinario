import React, { useEffect, useState } from 'react'
import {  Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import DatePicker from 'react-native-date-picker';

const Formulario = ({ 
    modalVisible, 
    cerrarModal, 
    setPacientes, 
    pacientes, 
    paciente: pacienteObj,
    setPaciente: setPacienteApp,
    guardarCitasStorage
}) => {
    //Hooks
    const [ paciente, setPaciente ] = useState('')
    const [ id, setId ] = useState('')
    const [ propietario, setPropietario ] = useState('')
    const [ telefono, setTelefono ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ sintomas, setSintomas ] = useState('')
    const [ fecha, setFecha ] = useState(new Date())

    //Se evalua si hay paciente activo o no para set por default
    useEffect(() => {
        if(Object.keys(pacienteObj).length > 0 ) {
            setId(pacienteObj.id)
            setPaciente(pacienteObj.paciente)
            setPropietario(pacienteObj.propietario)
            setEmail(pacienteObj.email)
            setTelefono(pacienteObj.telefono)
            setFecha(pacienteObj.fecha)
            setSintomas(pacienteObj.sintomas)
            //console.log("si hay")
        }
    }, [pacienteObj])

    const handleCita = () =>{
        //validar
        if([paciente, propietario, email, fecha, sintomas].includes('')){
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios',
                //[{text: 'Cancelar'},{text: 'Aceptar'}]
            )
            return
        }
        const nuevoPaciente = {
            paciente,
            propietario,
            email,
            telefono,
            fecha,
            sintomas
        }
        //Registro nuevo o  edicion
        if(id){
            //editando
            nuevoPaciente.id = id
            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState)
            setPacientes(pacientesActualizados)
            setPacienteApp({})
            //agreegando al storage
            guardarCitasStorage(JSON.stringify(pacientesActualizados))
        }else{
            //nuevo registro
            nuevoPaciente.id = Date.now()
            setPacientes([...pacientes, nuevoPaciente])
        }
        //viene de app.js para cerrar modal
        cerrarModal()
        //regresamos el formulario a vacio
        setId('')
        setPaciente('')
        setPropietario('')
        setEmail('')
        setTelefono('')
        setFecha(new Date())
        setSintomas('')
    }


    return (
        <Modal
            animationType='fade'
            visible={modalVisible}
        >
            <SafeAreaView style={styles.contenido}>
                <ScrollView>
                    {/* Titulo condicional */}
                    <Text style={styles.titulo}>
                        {pacienteObj.id ? 'Editar' : 'Nueva'}{' '}
                        <Text style={styles.tituloBold}>
                            Cita
                        </Text>
                    </Text>
                    {/* Boton cancelar */}
                    <Pressable 
                        style={styles.btnCancelar}
                        onLongPress={ () => {
                            cerrarModal()
                            setPacienteApp({})
                            setId('')
                            setPaciente('')
                            setPropietario('')
                            setEmail('')
                            setTelefono('')
                            setFecha(new Date())
                            setSintomas('')
                        }}
                    >
                        <Text style={styles.btnCancelarTxt}>Cancelar</Text>
                    </Pressable>

                    {/* Input Paciente */}
                    <View style={styles.campo}>
                        <Text style={styles.label}>Paciente</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Paciente'
                            placeholderTextColor={'#666'}
                            value={ paciente }
                            onChangeText={ setPaciente }
                        />
                    </View>
                    {/* Input Propietario */}
                    <View style={styles.campo}>
                        <Text style={styles.label}>Propietario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Propietario'
                            placeholderTextColor={'#666'}
                            value={ propietario }
                            onChangeText={ setPropietario }
                        />
                    </View>
                    {/* Input Email */}
                    <View style={styles.campo}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            keyboardType='email-address'
                            placeholderTextColor={'#666'}
                            value={ email }
                            onChangeText={ setEmail }
                        />
                    </View>
                    {/* Input Telefono */}
                    <View style={styles.campo}>
                        <Text style={styles.label}>Telefono</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Telefono'
                            keyboardType='number-pad'
                            placeholderTextColor={'#666'}
                            value={ telefono }
                            onChangeText={ setTelefono }
                            maxLength={11}
                        />
                    </View>
                    {/* Input Fecha Alta */}
                    <View style={styles.campo}>
                        <Text style={styles.label}>Fecha Alta</Text>
                        <View style={styles.fechaContenedor}>
                            <DatePicker
                                date={fecha}
                                locale='es'
                                onDateChange={()=> setFecha}
                            />
                        </View>
                    </View>
                    {/* Input Sintomas */}
                    <View style={styles.campo}>
                        <Text style={styles.label}>Sintomas</Text>
                        <TextInput
                            style={[styles.input , styles.sintomasInput]}
                            value={ sintomas }
                            onChangeText={ setSintomas }
                            multiline={true}
                            numberOfLines={10}
                        />
                    </View>
                    {/* Boton condicional editar/agregar cita */}
                    <Pressable
                        style={styles.btnNuevaCita}
                        onPress={handleCita}
                    >
                        <Text style={styles.btnNuevaCitaTxt}>{pacienteObj.id ? 'Editar' : 'Agregar'} Paciente</Text>
                    </Pressable>
                    
                </ScrollView>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
    btnCancelar:{
        marginVertical: 30,
        backgroundColor: '#FF0000',
        marginHorizontal: 40,
        padding: 15,
        borderRadius: 12
    },
    btnCancelarTxt:{
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase'
    },
    contenido:{
        backgroundColor: '#6D28D9',
        flex: 1
    },
    campo:{
        marginTop: 10,
        marginHorizontal: 40
    },
    label:{
        color: '#FFF',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 18,
        fontWeight: '600'
    },
    input:{
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10      
    }
     ,
    sintomasInput:{
        height: 100
       // marginBottom: 50
    },
    fechaContenedor:{
        backgroundColor: '#FFF',
        borderRadius: 10
    },
    btnNuevaCita:{
        marginVertical: 50,
        backgroundColor: '#F59E0B',
        paddingVertical: 15,
        marginHorizontal: 40,
        borderRadius: 12
    },
    btnNuevaCitaTxt:{
        textAlign: 'center',
        fontWeight: '900',
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 16
    }
})
export default Formulario