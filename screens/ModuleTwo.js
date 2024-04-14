import React, { useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const ModuleTwo = ({ navigation }) => {
  const [loaded] = useFonts({
    'Montserrat-SemiBold': require('../assets/fonts/Righteous-Regular.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!loaded) {
    // Font is still loading, return null or a loading indicator
    return null;
  }


  return (
    <View style={styles.container}>

        <View style={styles.header}>
          {/* Arrow icon to navigate back */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Bandaging Techniques</Text>
        </View>
        <ScrollView style={styles.scrollView}>
        <ImageBackground
          style={styles.headerImage}
          source={require('../assets/images/bandage.jpg')}
          resizeMode='stretch'
        >
        </ImageBackground>

          <Text style={styles.textTitle}>Introduction</Text>
          <Text style={styles.textDescription}>
          Welcome to the Bandaging Techniques lesson, where you'll learn essential skills 
          for effectively applying bandages and dressings to wounds. Proper bandaging is \
          crucial for protecting injuries, promoting healing, and preventing infection.
          </Text>


        <Text style={styles.textTitle}>Understanding Bandaging Basics:</Text>
        <Text style={styles.textDescription}>
        Before we dive into specific techniques, let's understand the 
        basic principles of bandaging:{"\n"}{"\n"}

          <Text style={{ fontWeight: 'bold' }}>Immobilization: </Text> Bandages help immobilize injured body parts to prevent further 
          damage and promote healing.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Compression: </Text> Some bandages provide compression to reduce 
          swelling and support injured areas.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Protection: </Text>  Bandages protect wounds from 
          contamination and further injury.
        </Text>
        <Text style={styles.textTitle}>Types of Bandages</Text>
        <Text style={styles.textDescription}>
        There are several types of bandages, each with its own purpose and application:{"\n"}{"\n"}

          <Text style={{ fontWeight: 'bold' }}>Adhesive Bandages (e.g., Band-Aids):  </Text>  Ideal for small cuts and scrapes.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Gauze Bandages: </Text> Used to cover larger wounds and absorb fluids.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Elastic Bandages: </Text> Provide compression and support for sprains, strains, and joint injuries.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Triangular Bandages: </Text>  Versatile bandages used for creating slings, securing splints, and supporting injured limbs.{"\n"}
        </Text>
        <Text style={styles.textTitle}>Basic Bandaging Techniques:</Text>
        <Text style={styles.textDescription}>
        Now, let's learn how to apply basic bandages for common injuries:{"\n"}{"\n"}

          <Text style={{ fontWeight: 'bold' }}>Circular Bandaging: </Text> Wrap the bandage in a circular motion around the injured area, ensuring even coverage and support.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Spiral Bandaging:  </Text> Wrap the bandage in a spiral pattern, starting from the base of the limb and working upwards.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Figure-Eight Bandaging:  </Text>  Create a figure-eight pattern around joints or areas requiring additional support.
        </Text>
        <Text style={styles.textTitle}> Specialized Bandaging Techniques:</Text>
        <Text style={styles.textDescription}>
        In addition to basic techniques, there are specialized bandaging methods for specific situations:{"\n"}{"\n"}

          <Text style={{ fontWeight: 'bold' }}>Compression Bandaging: </Text> Apply firm, even pressure to reduce swelling and support injured areas.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Tourniquet Application: </Text> As a last resort for severe bleeding, apply a tourniquet proximal to the injury site to restrict blood flow.{"\n"}
          </Text>
        <Text style={styles.textTitle}>Conclusion</Text>
        <Text style={styles.textDescription}>
        Congratulations! You've completed the Bandaging Techniques lesson. By mastering these 
        skills, you're better prepared to provide effective wound care in various emergency 
        situations. Remember to assess the injury, choose the appropriate 
        bandage, and apply it correctly to ensure optimal healing and protection.{"\n"}{"\n"}

          Continue practicing and reviewing these techniques regularly to
          maintain your skills and readiness to help others in need.
        </Text>
      </ScrollView>
    </View>
  );
};

export default ModuleTwo;

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