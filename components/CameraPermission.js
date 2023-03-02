import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

export default function CameraPermission({ requestPermission }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        We need your permission to show the camera
      </Text>
      <Button onPress={requestPermission} title="Grant Permission" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#04181F',
  },
  text: { textAlign: 'center' },
});
