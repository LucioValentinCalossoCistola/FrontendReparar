import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../services/firebase';
import { getAuth } from 'firebase/auth';

// Chat basado en Firestore: colección 'chats' -> doc por chat (trabajo_<id>) -> subcolección 'messages'
// Ventaja: realtime y fácil de integrar con Firebase Auth (ya usado en app).

export default function ChatScreen({ route }) {
  const { trabajo } = route.params || {};
  const chatId = trabajo ? `trabajo_${trabajo.id_trabajo}` : 'global';
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const flatRef = useRef();

  useEffect(() => {
    const q = query(collection(firestore, `chats/${chatId}/messages`), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      const docs = [];
      snap.forEach(d => docs.push({ id: d.id, ...d.data() }));
      setMessages(docs);
    });
    return () => unsub();
  }, [chatId]);

  const send = async () => {
    if (!text.trim()) return;
    const auth = getAuth();
    const user = auth.currentUser;
    await addDoc(collection(firestore, `chats/${chatId}/messages`), {
      text: text.trim(),
      uid: user?.uid || 'anon',
      email: user?.email || null,
      createdAt: serverTimestamp(),
    });
    setText('');
    // scroll handled by FlatList on data change
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={styles.container}>
      <Text style={styles.h1}>Chat - {trabajo ? `Trabajo #${trabajo.id_trabajo}` : 'General'}</Text>
      <FlatList ref={flatRef} data={messages} keyExtractor={m => m.id} renderItem={({item}) => (
        <View style={[styles.msg, item.uid === getAuth().currentUser?.uid ? styles.myMsg : styles.otherMsg]}>
          <Text style={{fontSize:12, color:'#666'}}>{item.email}</Text>
          <Text>{item.text}</Text>
        </View>
      )} />
      <View style={styles.composer}>
        <TextInput value={text} onChangeText={setText} placeholder="Escribí..." style={styles.input} />
        <Button color="#0b9d57" title="Enviar" onPress={send} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:12, backgroundColor:'#f6fbf6' },
  h1: { fontSize:18, fontWeight:'700', color:'#0b9d57', marginBottom:8 },
  msg: { padding:8, borderRadius:8, marginVertical:6, maxWidth:'80%' },
  myMsg: { backgroundColor:'#e6f4ea', alignSelf:'flex-end' },
  otherMsg: { backgroundColor:'#fff', alignSelf:'flex-start' },
  composer: { flexDirection:'row', alignItems:'center', borderTopWidth:1, borderColor:'#eee', paddingTop:8 },
  input: { flex:1, borderWidth:1, borderColor:'#e6f4ea', padding:8, marginRight:8, borderRadius:8, backgroundColor:'#fff' }
});
