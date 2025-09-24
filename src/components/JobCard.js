import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function JobCard({ job, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{job.descripcion || `Trabajo #${job.id_trabajo}`}</Text>
      <Text style={styles.meta}>Zona: {job.zona_geografica_trabajo?.direccion || '—'}</Text>
      <Text style={styles.meta}>Profesión: {job.profesion_requerida?.nombre || '—'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, marginVertical: 6, borderWidth: 1, borderColor: '#e6f4ea', borderRadius: 10, backgroundColor: '#ffffff' },
  title: { fontWeight: '700', color: '#0b9d57' },
  meta: { color: '#555', marginTop: 4 }
});
