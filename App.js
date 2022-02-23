import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Pressable, Modal, Button, FlatList, Alert } from 'react-native';
import Formulario from './src/components/Formulario';
import InformacionPaciente from './src/components/InformacionPaciente';
import Paciente from './src/components/Paciente';


const App = () => {
  //Hooks se colocan aca
  const [ modalVisible, setModalVisible] = useState(false)
  const [ pacientes, setPacientes] = useState([])

  const [ paciente, setPaciente] = useState({})
  const [ modalPaciente, setModalPaciente] = useState(false)

  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas')
        if(citasStorage){
          setPacientes(JSON.parse(citasStorage))
        }
      } catch (error) {
        console.log(error);
      }
    }
    obtenerCitasStorage();
  },[])
  
  //editar paciente
  const pacienteEditar = id => {
    const pacienteEditar = pacientes.filter(paciente => paciente.id === id)

    setPaciente(pacienteEditar[0])
  }
  //eliminar paciente
  const pacienteEliminar = id => {
    Alert.alert(
      '¿Deseas Eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        {text: 'Cancelar'},
        {text: 'Eliminar', onPress: () => {
          //filtramos el array
          const pacientesActualizados = pacientes.filter( pacientesState => pacientesState.id !== id)
          
          setPacientes(pacientesActualizados)
          guardarCitasStorage(JSON.stringify(pacientesActualizados))
        }}
      ]
    )
  }

  const cerrarModal = () => {
    setModalVisible(false)
  }

  //almacenar citas en storage
  const guardarCitasStorage = async (citasJSON) =>{
    try {
      await AsyncStorage.setItem('citas', citasJSON)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Administrador de Citas{' '}
        <Text style={styles.tituloBold}>Veterinaria</Text>  
      </Text>
      
      {/* Boton nueva cita , activa modal */}
      <Pressable
        style={styles.btnNuevaCita}
        onPress={ () => {
          setModalVisible(true)
        }}
      >
        <Text
          style={styles.btnTextoNuevaCita}
        >Nueva Cita</Text>
      </Pressable>

      {/* Contenido de pantalla principal */}
      {pacientes.length === 0 ? 
        <Text style={styles.noPacientes}>No hay pacientes aun</Text> : 
        <FlatList
          style={styles.listado}
          data={ pacientes }
          keyExtractor={ (item) => item.id }
          renderItem={ ({item}) => {
            return(
              <Paciente
                pacienteEditar = {pacienteEditar}
                item = { item }
                setPaciente = { setPaciente }
                setModalVisible = {setModalVisible}
                pacienteEliminar = { pacienteEliminar }
                setModalPaciente = { setModalPaciente }

              />
            )
          }}
        />
      }
      {/* Formulario que se activa en modal de boton */}
      {modalVisible && (
        <Formulario
          pacientes = { pacientes }
          setPacientes = { setPacientes }          
          paciente = { paciente }
          setPaciente = { setPaciente }
          cerrarModal = { cerrarModal }
          guardarCitasStorage = { guardarCitasStorage }
        />
      )}

      {/* Modal que se activa en venta de paciente */}
      <Modal
        visible={modalPaciente}
        animationType='fade'
      >
        <InformacionPaciente 
          paciente = { paciente }
          setModalPaciente = { setModalPaciente }
          setPaciente = { setPaciente }
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#F3F4F6',
    flex: 1
  },
  titulo:{
    textAlign: 'center',
    fontSize: 40,
    color: '#374151',
    fontWeight: '600'
  },
  tituloBold:{
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita:{
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 20,
    marginHorizontal: 25,
    borderRadius: 15
  },
  btnTextoNuevaCita:{
    textAlign: 'center',
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes:{
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#000'
  },
  listado:{
    marginTop: 50,
    marginHorizontal: 30
  }
})

export default App;
