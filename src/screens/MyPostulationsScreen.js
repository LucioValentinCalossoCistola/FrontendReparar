import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import api from '../api/api';
import PostulationCard from '../components/PostulationCard';

export default function MyPostulationsScreen() {
  const [posts, setPosts] = useState([]);

  const load = async () => {
    try {
      const me = await api.get('/trabajador/me/');
      const res = await api.get(`/postulaciones/?id_trabajador=${me.data.id_trabajador}`);
      setPosts(res.data);
    } catch (e) { console.warn(e); }
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Mis Postulaciones</Text>
      <FlatList data={posts} keyExtractor={p => String(p.id_postulacion)} renderItem={({item}) => (
        <PostulationCard post={item} />
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:'#f6fbf6' },
  h1: { fontSize:18, fontWeight:'700', color:'#0b9d57', marginBottom:8 }
});
