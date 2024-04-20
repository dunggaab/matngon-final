import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Linking} from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const EmergencyNumber = ({ navigation }) => {

  const [loaded] = useFonts({
    'Montserrat-SemiBold': require('../assets/fonts/Righteous-Regular.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!loaded) {
      // Font is still loading, return null or a loading indicator
      return null;
  }

  // Function to handle speed dial
  const handleSpeedDial = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          {/* Arrow icon to navigate back */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} color="#fff" size={20} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Emergency Numbers</Text>
        </View>
      <ScrollView style={styles.scrollView}>
      {emergencyNumbers.map((emergency, index) => (
        <TouchableOpacity key={index} onPress={() => handleSpeedDial(emergency.number)} style={styles.emergencyNumberContainer}>
          <Text style={styles.emergencyTitle}>{emergency.title}</Text>
          <Text style={styles.emergencyText}>Hotline: {emergency.number}</Text>
          <Text style={styles.emergencyDescription}>{emergency.description}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fb',
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
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 20, // Adjust this value according to your footer height
  },
  emergencyNumberContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginBottom: 10,
  },
  emergencyTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 19,
    fontWeight: '700',
    color: '#373f46',
    marginBottom: 2,
  },
  emergencyText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    fontWeight: '500',
    color: '#ff6d00',
    marginBottom: 2,
  },
  emergencyDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: '#373f46',
  },
});

// Define your emergency numbers here
const emergencyNumbers = [
  {
    title: "National Emergency Number",
    number: "911",
    description: "This number is used for emergency situations such as medical emergencies, accidents, fires, and other urgent incidents requiring immediate assistance from police, fire department, or medical services."
  },
  {
    title: "Philippine National Police",
    number: "117",
    description: "This hotline connects callers to the Philippine National Police for reporting crimes, seeking assistance during emergencies, and contacting law enforcement agencies for immediate help."
  },
  {
    title: "Bureau of Fire Protection",
    number: "(02) 8426-0219",
    description: "The BFP hotline is used to report fires, request assistance during fire-related emergencies, and seek help from the Bureau of Fire Protection for fire suppression and rescue operations."
  },
  {
    title: "Philippine Red Cross Hotline",
    number: "(02) 8790-2300",
    description: "These hotlines are operated by the Philippine Red Cross and are utilized for medical emergencies and disaster response. Callers can request ambulance services, medical assistance, and seek help during disasters."
  },
  {
    title: "National Disaster Risk Reduction and Management Council",
    number: "(02) 8911-1406",
    description: "The NDRRMC hotline is dedicated to handling disaster-related emergencies. It provides assistance, coordination, and support during natural calamities, emergencies, and disaster situations across the Philippines."
  },
  {
    title: "Cebu City Traffic Operations Management",
    number: "(032) 253-9211",
    description: "CITOM hotline is specific to traffic-related emergencies within Cebu City. It allows residents to report traffic accidents, road obstructions, and seek assistance for traffic-related issues."
  },
  {
    title: "Cebu Provincial Police Office",
    number: "(032) 255-7646",
    description: "This hotline connects callers to the Cebu Provincial Police Office. It is used for reporting crimes, seeking assistance during emergencies, and contacting local law enforcement authorities within the province of Cebu."
  },
  {
    title: "Emergency Rescue Unit Foundation",
    number: "161",
    description: "ERUF Cebu hotline is dedicated to providing ambulance services and emergency medical assistance within Cebu. Callers can request ambulances, medical aid, and seek help during medical emergencies."
  },
];

export default EmergencyNumber;
