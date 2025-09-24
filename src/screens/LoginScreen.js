import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../services/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally { setLoading(false); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>repar-AR</Text>
      <View style={styles.box}>
        <Text style={styles.h1}>Iniciar sesión</Text>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize='none' />
        <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
        <Button color="#0b9d57" title="Ingresar" onPress={login} disabled={loading} />
        <View style={{height:8}} />
        <Button title="Crear cuenta" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#f6fbf6', justifyContent:'center', padding:20 },
  title: { fontSize:36, fontWeight:'900', color:'#0b9d57', textAlign:'center', marginBottom:20 },
  box: { backgroundColor:'#fff', padding:16, borderRadius:12, shadowColor:'#00000020' },
  h1: { fontSize:20, marginBottom:12, color:'#093' },
  input: { borderWidth:1, borderColor:'#e6f4ea', padding:10, marginBottom:10, borderRadius:8 }
});
