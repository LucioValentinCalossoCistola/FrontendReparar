import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import api from '../api/api';
import JobCard from '../components/JobCard';

export default function JobListScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get('/trabajos/');
      setJobs(res.data);
    } catch (e) { console.warn(e); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.h1}>Trabajos disponibles</Text>
        <Button color="#0b9d57" title="Refrescar" onPress={load} />
      </View>
      <FlatList data={jobs} keyExtractor={j => String(j.id_trabajo)} renderItem={({item}) => (
        <JobCard job={item} onPress={() => navigation.navigate('JobDetail', { job: item })} />
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:'#f6fbf6' },
  h1: { fontSize:20, fontWeight:'700', color:'#0b9d57' },
  headerRow: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:8 }
});
