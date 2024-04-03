import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from '@tensorflow-models/mobilenet';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';

const textureDims = Platform.OS === 'ios' ?
  {
    height: 1920,
    width: 1080,
  } :
  {
    height: 1200,
    width: 1600,
  };

const computeRecognitionEveryNFrames = 60;

const TensorCamera = cameraWithTensors(Camera);

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [detections, setDetections] = useState([]);
  const [net, setNet] = useState(null);
  const cameraRef = useRef(null);
  let frame = 0;

  useEffect(() => {
    const initialiseTensorflow = async () => {
      await tf.ready();
      console.log('TensorFlow is ready.');
      await loadMobilenetModel();
      tf.getBackend();
    };

    const loadMobilenetModel = async () => {
      try {
        const net = await mobilenet.load({ version: 1, alpha: 0.25 });
        console.log('Mobilenet model loaded successfully.');
        setNet(net);
      } catch (error) {
        console.error('Error loading Mobilenet model:', error);
      }
    };

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      await initialiseTensorflow();
    })();
  }, []);

  const handleCameraStream = async (images) => {
    if (net) {
      if (frame % computeRecognitionEveryNFrames === 0) {
        const nextImageTensor = images.next().value;
        if (nextImageTensor) {
          try {
            const objects = await net.classify(nextImageTensor);
            console.log('Detected objects:', objects);
            if (objects && objects.length > 0) {
              setDetections(objects.map(object => object.className));
            } else {
              setDetections([]);
            }
          } catch (error) {
            console.error('Error classifying image:', error);
          }
          tf.dispose([nextImageTensor]);
        }
      }
      frame += 1;
      frame = frame % computeRecognitionEveryNFrames;
    }

    requestAnimationFrame(() => handleCameraStream(images));
  };

  useEffect(() => {
    if (net) {
      const loop = async () => {
        // No need to take a picture here
        // const imageTensor = await cameraRef.current.takePictureAsync();
        // handleCameraStream(imageTensor);
      };
      loop();
    }
  }, [net]);

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <View />
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : !net ? (
        <Text>Model not loaded</Text>
      ) : (
        <React.Fragment>
          <TensorCamera 
            style={styles.camera} 
            onReady={handleCameraStream}
            type={Camera.Constants.Type.back}
            cameraTextureHeight={textureDims.height}
            cameraTextureWidth={textureDims.width}
            resizeHeight={200}
            resizeWidth={152}
            resizeDepth={3}
            autorender={true}
            ref={cameraRef}
          />
          <View style={styles.text}>
            {detections.map((detection, index) => 
                <Text key={index}>{detection}</Text>
            )}
          </View>
        </React.Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
  },
  camera: {
    flex: 7,
    width: '100%',
  },
});
