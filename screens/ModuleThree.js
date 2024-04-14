import React, { useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const ModuleThree = ({ navigation }) => {
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
          <Text style={styles.headerText}>Treating Minor Cuts and Scrapes</Text>
        </View>
        <ScrollView style={styles.scrollView}>
        <ImageBackground
          style={styles.headerImage}
          source={require('../assets/images/scrape.png')}
          resizeMode='stretch'
        >
        </ImageBackground>

          <Text style={styles.textTitle}>Introduction</Text>
          <Text style={styles.textDescription}>
          Welcome to the Treating Minor Cuts and Scrapes lesson, where you'll learn 
          essential first aid skills for effectively treating minor injuries. Proper 
          care of cuts and 
          scrapes is important for preventing infection and promoting healing.
          </Text>


        <Text style={styles.textTitle}>Understanding Minor Cuts and Scrapes</Text>
        <Text style={styles.textDescription}>
        Before we begin, let's understand what constitutes a minor cut or scrape:{"\n"}{"\n"}

          <Text style={{ fontWeight: 'bold' }}>Minor Cuts: </Text> Superficial wounds that typically result from 
          sharp objects breaking the skin's surface.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Scrapes: </Text> Abrasions caused by friction or rubbing 
          against rough surfaces, resulting in superficial skin damage.{"\n"}
        </Text>
        <Text style={styles.textTitle}>Cleaning the Wound Properly</Text>
        <Text style={styles.textDescription}>
        The first step in treating a minor cut or scrape is to clean the wound thoroughly:{"\n"}{"\n"}

          <Text style={{ fontWeight: 'bold' }}>Wash Hands: </Text> Before touching the wound, wash your hands with soap and water to prevent infection.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Rinse with Water:  </Text> Gently rinse the wound under cool, running water to remove dirt and debris.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Use Mild Soap: </Text>  If available, use mild soap to clean the area around the wound, avoiding getting soap inside the wound.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Pat Dry: </Text> Use a clean towel or sterile gauze to pat the area dry, being careful not to rub or irritate the wound further.{"\n"}
        </Text>
        <Text style={styles.textTitle}>Applying Antiseptic or Antibiotic Ointment</Text>
        <Text style={styles.textDescription}>
        After cleaning the wound, apply antiseptic or antibiotic ointment to prevent infection:{"\n"}{"\n"}

          <Text style={{ fontWeight: 'bold' }}>Apply Ointment: </Text> Squeeze a small amount of ointment onto clean hands or a 
          sterile applicator.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Cover the Wound: </Text> Apply a thin layer of ointment directly to the cleaned wound, 
          ensuring full coverage.{"\n"}
        </Text>
        <Text style={styles.textTitle}>Using Sterile Bandages or Dressings</Text>
        <Text style={styles.textDescription}>
        Once the wound is clean and treated with ointment, cover it with a sterile bandage or dressing:{"\n"}{"\n"}

          <Text style={{ fontWeight: 'bold' }}>Select Bandage: </Text> Choose an appropriate size and type of bandage based on the size and location of the wound.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Cover Wound: </Text> Place the sterile dressing over the wound, ensuring it covers the entire area.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Secure in Place: </Text>  Use adhesive tape or bandage to secure the dressing in place, ensuring it stays clean and protected.{"\n"}
        </Text>
        <Text style={styles.textTitle}>Signs of Infection and When to Seek Medical Attention</Text>
        <Text style={styles.textDescription}>Finally, be aware of signs of infection and know when to seek medical attention:{"\n"}{"\n"}

          <Text style={{ fontWeight: 'bold' }}>Signs of Infection: </Text> Increased pain, redness, swelling, warmth around the wound, pus or discharge, fever.{"\n"}
          <Text style={{ fontWeight: 'bold' }}>Seek Medical Attention:  </Text> If signs of infection develop or worsen, or if the wound is deep, large, or caused by a dirty or rusty object.{"\n"}
        </Text>
        <Text style={styles.textTitle}>Conclusion</Text>
        <Text style={styles.textDescription}>
        Congratulations! You've completed the Treating Minor Cuts and Scrapes lesson. By mastering these first aid techniques, 
        you're better prepared to provide immediate care for common injuries and promote healing. 
        Remember to stay calm, assess the wound, and provide 
        prompt treatment to prevent infection and complications.
        </Text>
      </ScrollView>
    </View>
  );
};

export default ModuleThree;

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
