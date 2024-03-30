import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Animated, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';


const ModuleOne = ({ navigation }) => {
  const [loaded] = useFonts({
    'Montserrat-SemiBold': require('../assets/fonts/Righteous-Regular.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const windowHeight = Dimensions.get('window').height;
  const contentHeight = windowHeight * 4; // Adjust this based on your content length

  const [loading, setLoading] = useState(true);

  if (!loaded || loading) {
    // Font is still loading or content is loading, display a loader
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fe8302" />
      </View>
    );
  }

  const progress = Animated.divide(scrollY, contentHeight - windowHeight).interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        onContentSizeChange={() => setLoading(false)} // Content is loaded
      >
        <View style={styles.header}>
          {/* Arrow icon to navigate back */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerText}>First Aid 101</Text>
        </View>
        <ImageBackground
          style={styles.headerImage}
          source={require('../assets/images/aid.png')}
          resizeMode='stretch'
        >
        </ImageBackground>

          <Text style={styles.textTitle}>Introduction</Text>
          <Text style={styles.textDescription}>
            Welcome to First Aid 101, where you'll learn crucial
            life-saving techniques that can make a difference in emergencies.
            In this lesson, we'll cover the ABCs of First Aid
            (Airway, Breathing, Circulation) and explore the
            contents of a basic first aid kit.
          </Text>


        <Text style={styles.textTitle}>Understanding the ABCs of First Aid</Text>
        <Text style={styles.textDescription}>
          Let's start with the fundamentals. In any emergency situation,
          the first priority is to assess and ensure the patient's ABCs: {"\n"}{"\n"}

          <Text style={{ fontWeight: 'bold' }}>Airway: </Text> Check if the airway is clear by gently tilting the head
          back and lifting the chin to open the airway.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Breathing: </Text> Look, listen, and feel for breathing. Place your ear
          close to the patient's mouth and nose, watch for chest rise and fall,
          and feel for airflow.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Circulation: </Text> Check for signs of circulation, such as a pulse.
          Feel for the pulse on the carotid artery in the neck or the
          radial artery in the wrist.
        </Text>
        <Text style={styles.textTitle}>Basic First Aid Kit Essentials</Text>
        <Text style={styles.textDescription}>
          Now, let's delve into the contents of a basic first aid kit.
          These items are essential for providing immediate care in various
          emergency situations:{"\n"}{"\n"}

          <Text style={{ fontWeight: 'bold' }}>Bandages: </Text> Including adhesive bandages (Band-Aids), gauze pads,
          and elastic bandages for wrapping sprains or strains.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Antiseptic Wipes or Solution: </Text> For cleaning wounds to prevent infection.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Adhesive Tape: </Text> Used to secure dressings or bandages in place.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Gloves: </Text>  Disposable gloves to protect both the rescuer and
          the patient from contamination.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>CPR Mask: </Text>  A barrier device used during cardiopulmonary resuscitation
          (CPR) to prevent direct contact with the patient's mouth and nose.{"\n"}

        </Text>
        <Text style={styles.textTitle}>Conclusion</Text>
        <Text style={styles.textDescription}>
          Congratulations! You've completed the First Aid 101 lesson on
          life-saving techniques. By understanding the ABCs of First Aid and
          the contents of a basic first aid kit, you're better equipped to
          respond effectively in emergency situations. Remember to stay calm,
          assess the situation carefully, and provide prompt care to those in
          need.{"\n"}{"\n"}

          Continue practicing and reviewing these techniques regularly to
          maintain your skills and readiness to help others in times of crisis.
        </Text>
      </ScrollView>
      <Animated.View style={[styles.progressBar, { width: progress }]} />
    </View>
  );
};

export default ModuleOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fb',
    alignItems: 'stretch',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fe8302',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  headerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    // Replace the path with your image source
    //background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(255, 109, 0, 0.20) 75.5%), url(<path-to-image>) lightgray 50% / cover no-repeat',
  },
  textTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    fontWeight: '700',
    color: '#fe8302',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  textDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: '#373f46',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: '#fe8302', // Change the color of the progress bar
  },
});

