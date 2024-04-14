import React, { useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ModuleOne = ({ navigation }) => {
  const [loaded] = useFonts({
    'Montserrat-SemiBold': require('../assets/fonts/Righteous-Regular.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!loaded) {
    // Fonts are still loading, return null or a loader
    return null;
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          {/* Arrow icon to navigate back */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerText}>First Aid 101</Text>
        </View>
        <ScrollView style={styles.scrollView}>
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
    paddingTop: 30,
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
  },
  textTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 19,
    fontWeight: '700',
    color: '#fe8302',
    marginTop: 15,
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
    marginBottom: 5,
    marginTop: 3,
    backgroundColor: '#ffffff',
    borderRadius: 7,
    padding: 10
  },
});
