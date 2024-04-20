import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Platform, PermissionsAndroid, TouchableOpacity, Modal, Vibration } from 'react-native';
import { Camera } from 'expo-camera';
import { bundleResourceIO, cameraWithTensors } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
import { useFonts } from 'expo-font';

const TensorCamera = cameraWithTensors(Camera);

const CAM_PREVIEW_WIDTH = Dimensions.get('window').width;
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (9 / 16);
const OUTPUT_TENSOR_WIDTH = 272;
const OUTPUT_TENSOR_HEIGHT = 480;

const classNames = [
  { name: "Stairs", warning: "Be cautious while ascending or descending stairs.", instructions: "Use handrails if available. Ensure safe footing." },
  { name: "Scissor", warning: "Exercise caution when handling scissors." , instructions: "Keep scissors away from children. Use with care to avoid injury." },
  { name: "Knife", warning: "Handle knives carefully to prevent accidents.", instructions: "Keep knives sharp and away from children. Always cut away from yourself." },
  { name: "Door", warning: "Watch out for closing doors to prevent accidents.", instructions: "Be mindful of doors, especially automatic ones. Keep fingers clear of hinges." },
  { name: "Window", warning: "Avoid leaning against windows.", instructions: "Keep windows closed when not in use. Use window guards for safety." },
  { name: "Outlet", warning: "Be cautious around electrical outlets.", instructions: "Keep outlets covered when not in use. Do not overload outlets." }
];

const RiskDetector = ({ navigation }) => {
  const [tfReady, setTfReady] = useState(false);
  const [model, setModel] = useState();
  const [risk, setRisk] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isCameraRunning, setIsCameraRunning] = useState(true); // Track whether camera is running or not

  const rafId = useRef(null);

  const [fontsLoaded] = useFonts({
    'Montserrat-SemiBold': require('../assets/fonts/Righteous-Regular.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

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
      stopCamera(); // Stop camera when component unmounts
    };
  }, []);

  useEffect(() => {
    console.log("Modal visibility changed:", modalVisible);
  }, [modalVisible]); // This useEffect will trigger whenever modalVisible changes

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

    return () => {
      stopCamera(); // Stop camera when component unmounts
    };
  }, []);

  const stopCamera = () => {
    if (rafId.current != null && rafId.current !== 0) {
      cancelAnimationFrame(rafId.current);
      rafId.current = 0;
    }
  };

  const handleStopCamera = () => {
    stopCamera();
    setIsCameraRunning(false); // Update state to indicate camera is not running
    navigation.navigate('Fire App');
  };

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
      return true; // For platforms other than Android, assume permissions are granted
    }
  };
  

  const handleCameraStream = (images) => {
    console.log("Initializing");
  
    if (!images || !isCameraRunning) {
      console.log("Camera stream not available or camera not running.");
      return;
    }
  
    const loop = () => {
      console.log("I am here");
  
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
          const confidence = Math.max(...logits) / logits.reduce((acc, val) => acc + val, 0);
  
          if (maxIndex !== -1 && confidence > 0.95) {
            const detectedClass = classNames[maxIndex];
            console.log(`Detected object: ${detectedClass.name}`);
            setRisk(detectedClass.name);
            setModalVisible(true);
            stopCamera();
            Vibration.vibrate();
          } else {
            setModalVisible(false);
            console.log("No object detected or confidence below threshold.");
            setRisk('');
          }
        } else {
          console.log("No logits found.");
          setRisk('');
        }
      });
  
      rafId.current = requestAnimationFrame(loop); // Schedule the next animation frame
    };
  
    loop();
  };
  
  const closeModal = () => {
    setModalVisible(false);
    console.log('Modal closed'); // Log when the modal is closed
  };
  

  if (!fontsLoaded || !tfReady) {
    return (
      <View style={styles.loadingMsg}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Risk Detector</Text>
        </View>
        <TensorCamera
          style={styles.camera}
          autorender={true}
          type={Camera.Constants.Type.back}
          resizeWidth={OUTPUT_TENSOR_WIDTH}
          resizeHeight={OUTPUT_TENSOR_HEIGHT}
          resizeDepth={3}
          onReady={handleCameraStream}
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>RISK DETECTED</Text>
              {risk && (
                <>
                  <Text style={styles.modalMessage}>
                    Caution: {risk} Detected{'\n'}
                  </Text>
                  <Text style={styles.modalInstructions}>
                  {classNames.find(item => item.name === risk)?.warning}
                  {'\n'}
                  {classNames.find(item => item.name === risk)?.instructions}                  </Text>
                </>
              )}
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={handleStopCamera} style={styles.button}>
          <Text style={styles.buttonText}>Stop Camera and Exit</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: CAM_PREVIEW_WIDTH,
    height: CAM_PREVIEW_HEIGHT,
    //marginTop: Dimensions.get('window').height / 2 - CAM_PREVIEW_HEIGHT / 2,
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
  header: {
    backgroundColor: '#fe8302',
    padding: 10,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FF6D00',
    alignItems: 'center',
    marginTop: 15,
    alignSelf: 'center', // Align button horizontally to the center
    width: 250,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  headerText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
    color: '#FF6D00',
  },
  modalMessage: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    textAlign: 'center',
  },
  modalInstructions: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#FF6D00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
});

export default RiskDetector;