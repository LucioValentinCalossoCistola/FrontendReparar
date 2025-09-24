import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import '../services/firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Cuenta creada', 'Bienvenido');
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally { setLoading(false); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <View style={styles.box}>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize='none' />
        <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
        <Button color="#0b9d57" title="Crear cuenta" onPress={register} disabled={loading} />
        <View style={{height:8}} />
        <Button title="Volver al login" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#f6fbf6', justifyContent:'center', padding:20 },
  title: { fontSize:28, fontWeight:'800', color:'#0b9d57', textAlign:'center', marginBottom:20 },
  box: { backgroundColor:'#fff', padding:16, borderRadius:12 },
  input: { borderWidth:1, borderColor:'#e6f4ea', padding:10, marginBottom:10, borderRadius:8 }
});
