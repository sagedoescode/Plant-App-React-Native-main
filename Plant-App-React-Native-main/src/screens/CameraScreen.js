import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function CameraScreen() {
  const route = useRoute();
  console.log(route.name);
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const capture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      // Do something with the captured photo (e.g., save, display, or process it)
      console.log('Captured Image:', photo);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
      />
      <TouchableOpacity style={styles.captureButton} onPress={capture}>
        <Text style={styles.captureButtonText}>Take Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    position: 'absolute',
    bottom: 32,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  captureButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  goBackButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
  },
  goBackButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
