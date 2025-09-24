import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import api from '../api/api';

export default function RatingScreen({ route, navigation }) {
  const { trabajoId, target } = route.params || {};
  const [estrellas, setEstrellas] = useState(5);
  const [comentario, setComentario] = useState('');

  const submit = async () => {
    try {
      if (target === 'trabajador') {
        await api.post('/calificacion_trabajador/', { id_trabajo: trabajoId, estrellas, comentario });
      } else {
        await api.post('/calificacion_contratador/', { id_trabajo: trabajoId, estrellas, comentario });
      }
      Alert.alert('Gracias', 'Calificación enviada');
      navigation.goBack();
    } catch (e) { Alert.alert('Error', 'No se pudo enviar'); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Calificar</Text>
      <Text>Estrellas: {estrellas}</Text>
      <TextInput keyboardType='numeric' value={String(estrellas)} onChangeText={t => setEstrellas(Number(t)||0)} style={styles.input} />
      <TextInput placeholder='Comentario' value={comentario} onChangeText={setComentario} style={styles.input} />
      <Button color="#0b9d57" title='Enviar' onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:'#f6fbf6' },
  h1: { fontSize:18, fontWeight:'700', color:'#0b9d57', marginBottom:8 },
  input: { borderWidth:1, borderColor:'#e6f4ea', padding:8, marginBottom:8, borderRadius:8, backgroundColor:'#fff' }
});
