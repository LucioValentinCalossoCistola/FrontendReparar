import React from 'react';
import { View, Text, Button } from 'react-native';

export default function PostulationCard({ post, onCancel }) {
  return (
    <View style={{ padding:10, borderBottomWidth:1, borderColor:'#eee' }}>
      <Text style={{fontWeight:'700'}}>{post.trabajo?.descripcion}</Text>
      <Text>Fecha: {post.fecha_postulacion}</Text>
      {onCancel && <Button title="Cancelar" onPress={() => onCancel(post)} />}
    </View>
  );
}
