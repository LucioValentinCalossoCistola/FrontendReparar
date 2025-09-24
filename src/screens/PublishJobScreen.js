import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import api from '../api/api';

export default function PublishJobScreen({ navigation }) {
  const [descripcion, setDescripcion] = useState('');
  const [profesiones, setProfesiones] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [prof, setProf] = useState(null);
  const [zona, setZona] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, zRes] = await Promise.all([api.get('/profesiones/'), api.get('/zonas/')]);
        setProfesiones(pRes.data);
        setZonas(zRes.data);
      } catch (e) {}
    };
    load();
  }, []);

  const submit = async () => {
    try {
      const me = await api.get('/contratador/me/');
      await api.post('/trabajos/', {
        id_contratador: me.data.id_contratador,
        id_trabajador: 0,
        id_profesion_requerida: prof,
        id_zona_geografica_trabajo: zona,
        id_estado: 1,
        descripcion,
      });
      Alert.alert('Listo', 'Trabajo publicado');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'No se pudo publicar');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Publicar Trabajo</Text>
      <TextInput placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} style={styles.input} />
      <Text style={styles.label}>Profesiones</Text>
      {profesiones.map(p => (
        <TouchableOpacity key={p.id_profesion} onPress={() => setProf(p.id_profesion)} style={[styles.opt, prof===p.id_profesion && styles.optSel]}>
          <Text>{p.nombre}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.label}>Zonas</Text>
      {zonas.map(z => (
        <TouchableOpacity key={z.id_direccion} onPress={() => setZona(z.id_direccion)} style={[styles.opt, zona===z.id_direccion && styles.optSel]}>
          <Text>{z.direccion}</Text>
        </TouchableOpacity>
      ))}
      <Button color="#0b9d57" title="Publicar" onPress={submit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:'#f6fbf6' },
  h1: { fontSize:18, fontWeight:'700', color:'#0b9d57', marginBottom:8 },
  input: { borderWidth:1, borderColor:'#e6f4ea', padding:8, marginBottom:8, borderRadius:8 },
  label: { marginTop:8, marginBottom:4, fontWeight:'700' },
  opt: { padding:8, borderWidth:1, borderColor:'#e6f4ea', marginVertical:4, borderRadius:8, backgroundColor:'#fff' },
  optSel: { backgroundColor:'#eaf6ec', borderColor:'#0b9d57' }
});
