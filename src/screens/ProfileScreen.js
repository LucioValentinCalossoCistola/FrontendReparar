import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import api from '../api/api';
import { useAuth } from '../services/auth';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const t = await api.get('/trabajador/me/').catch(()=>null);
        if (t && t.data) { setProfile(t.data); return; }
        const c = await api.get('/contratador/me/').catch(()=>null);
        if (c && c.data) setProfile(c.data);
      } catch (e) { console.warn(e); }
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Perfil</Text>
      <Text style={styles.label}>Email: {user?.email}</Text>
      <Text style={styles.label}>Datos: {profile ? JSON.stringify(profile) : 'Cargando...'}</Text>
      <View style={{height:8}} />
      <Button color="#0b9d57" title="Cerrar sesión" onPress={async () => { await logout(); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:'#f6fbf6' },
  h1: { fontSize:20, fontWeight:'700', color:'#0b9d57', marginBottom:8 },
  label: { marginVertical:6 }
});
