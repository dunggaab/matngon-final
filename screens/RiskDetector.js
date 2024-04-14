import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Platform, PermissionsAndroid } from 'react-native';
import { Camera } from 'expo-camera';
import { bundleResourceIO, cameraWithTensors } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';

const TensorCamera = cameraWithTensors(Camera);

const CAM_PREVIEW_WIDTH = Dimensions.get('window').width;
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (9 / 16);
const OUTPUT_TENSOR_WIDTH = 272;
const OUTPUT_TENSOR_HEIGHT = 480;

const classNames = ["Stairs", "Scissor", "Knife", "Door", "Window", "Outlet"];

const RiskDetector = () => {
  const [tfReady, setTfReady] = useState(false);
  const [model, setModel] = useState();
  const [risk, setRisk] = useState('');

  const rafId = useRef(null);

  useEffect(() => {
    async function prepare() {
      rafId.current = null;

      console.log('Loading TensorFlow...');
      await tf.ready();
      console.log('TensorFlow is ready!');

      console.log('Loading model...');
      const modelJson = require('../models/model.json');
      const modelWeights = require('../models/weights.bin');
      const loadedModel = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
      setModel(loadedModel);
      console.log('Model loaded successfully!');

      setTfReady(true);
    }

    prepare();
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current != null && rafId.current !== 0) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
      }
    };
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app requires access to your camera.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
          return true;
        } else {
          console.log('Camera permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const handleCameraStream = (images) => {
    const loop = () => {
      if (rafId.current === 0) {
        return;
      }

      tf.tidy(() => {
        const imageTensor = images.next().value.expandDims(0).div(127.5).sub(1);

        const f = (OUTPUT_TENSOR_HEIGHT - OUTPUT_TENSOR_WIDTH) / 2 / OUTPUT_TENSOR_HEIGHT;
        const cropped = tf.image.cropAndResize(
          imageTensor,
          tf.tensor2d([f, 0, 1 - f, 1], [1, 4]),
          [0],
          [224, 224]
        );

        const result = model.predict(cropped);
        const logits = result.dataSync();

        if (logits) {
          const maxIndex = logits.indexOf(Math.max(...logits));
          if (maxIndex !== -1) {
            const detectedClass = classNames[maxIndex];
            console.log(`Detected object: ${detectedClass}`);
            setRisk(detectedClass);
          } else {
            console.log("No object detected.");
            setRisk('');
          }
        } else {
          console.log("No logits found.");
          setRisk('');
        }
      });

      rafId.current = requestAnimationFrame(loop);
    };

    loop();
  };

  useEffect(() => {
    const initializeCamera = async () => {
      const granted = await requestCameraPermission();
      if (granted) {
        console.log('Initializing camera...');
        setTfReady(true);
      } else {
        console.log('Failed to obtain camera permission.');
      }
    };

    initializeCamera();
  }, []);

  if (!tfReady) {
    return (
      <View style={styles.loadingMsg}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TensorCamera
          style={styles.camera}
          autorender={true}
          type={Camera.Constants.Type.back}
          resizeWidth={OUTPUT_TENSOR_WIDTH}
          resizeHeight={OUTPUT_TENSOR_HEIGHT}
          resizeDepth={3}
          onReady={handleCameraStream}
        />
        <View style={risk ? styles.resultContainer : null}>
          <Text style={styles.resultText}>
            {risk ? `Risk detected: ${risk}` : 'No risk detected'}
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: CAM_PREVIEW_WIDTH,
    height: CAM_PREVIEW_HEIGHT,
    marginTop: Dimensions.get('window').height / 2 - CAM_PREVIEW_HEIGHT / 2,
  },
  camera: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  loadingMsg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#00aa00',
  },
  resultText: {
    fontSize: 30,
    color: 'white',
  },
});

export default RiskDetector;
