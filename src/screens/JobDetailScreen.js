import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import api from '../api/api';

export default function JobDetailScreen({ route, navigation }) {
  const { job } = route.params;

  const postular = async () => {
    try {
      const me = await api.get('/trabajador/me/');
      await api.post('/postulaciones/', { id_trabajo: job.id_trabajo, id_trabajador: me.data.id_trabajador });
      Alert.alert('Éxito', 'Te postulaste');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'No se pudo postular');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.descripcion}</Text>
      <Text style={styles.meta}>Zona: {job.zona_geografica_trabajo?.direccion}</Text>
      <Text style={styles.meta}>Profesión: {job.profesion_requerida?.nombre}</Text>
      <Text style={styles.meta}>Estado: {job.estado?.nombre || job.id_estado}</Text>
      <View style={{height:12}} />
      <Button color="#0b9d57" title="Postularme" onPress={postular} />
      <View style={{height:8}} />
      <Button title="Abrir chat" onPress={() => navigation.navigate('Chat', { trabajo: job })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:'#f6fbf6' },
  title: { fontSize:18, fontWeight:'700', color:'#063' },
  meta: { marginTop:6, color:'#333' }
});
