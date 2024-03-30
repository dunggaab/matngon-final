import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';



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

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          {/* Arrow icon to navigate back */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Emergency Numbers</Text>
        </View>
      <View style={styles.emergencyNumberContainer}>
        <Text style={styles.emergencyTitle}>National Emergency Number</Text>
        <Text style={styles.emergencyText}>Hotline: 911</Text>
        <Text style={styles.emergencyDescription}>
          This number is used for emergency situations such as medical emergencies, accidents, fires, and other urgent incidents requiring immediate assistance from police, fire department, or medical services.
        </Text>
      </View>
      <View style={styles.emergencyNumberContainer}>
        <Text style={styles.emergencyTitle}>Philippine National Police</Text>
        <Text style={styles.emergencyText}>Hotline: 117</Text>
        <Text style={styles.emergencyDescription}>
          This hotline connects callers to the Philippine National Police for reporting crimes, seeking assistance during emergencies, and contacting law enforcement agencies for immediate help.
        </Text>
      </View>
      <View style={styles.emergencyNumberContainer}>
        <Text style={styles.emergencyTitle}>Bureau of Fire Protection</Text>
        <Text style={styles.emergencyText}>Hotline: 117 or (02) 8426-0219</Text>
        <Text style={styles.emergencyDescription}>
          The BFP hotline is used to report fires, request assistance during fire-related emergencies, and seek help from the Bureau of Fire Protection for fire suppression and rescue operations.
        </Text>
      </View>
      <View style={styles.emergencyNumberContainer}>
        <Text style={styles.emergencyTitle}>Philippine Red Cross Hotline</Text>
        <Text style={styles.emergencyText}>Hotline: (02) 8790-2300 or (02) 8790-2301</Text>
        <Text style={styles.emergencyDescription}>
          These hotlines are operated by the Philippine Red Cross and are utilized for medical emergencies and disaster response. Callers can request ambulance services, medical assistance, and seek help during disasters.
        </Text>
      </View>
      <View style={styles.emergencyNumberContainer}>
        <Text style={styles.emergencyTitle}>National Disaster Risk Reduction and Management Council</Text>
        <Text style={styles.emergencyText}>Hotline: (02) 8911-1406 to 24</Text>
        <Text style={styles.emergencyDescription}>
          The NDRRMC hotline is dedicated to handling disaster-related emergencies. It provides assistance, coordination, and support during natural calamities, emergencies, and disaster situations across the Philippines.
        </Text>
      </View>
      <View style={styles.emergencyNumberContainer}>
        <Text style={styles.emergencyTitle}>Cebu City Traffic Operations Management((032) 253-9211)</Text>
        <Text style={styles.emergencyText}>Hotline: (032) 253-9211</Text>
        <Text style={styles.emergencyDescription}>
          CITOM hotline is specific to traffic-related emergencies within Cebu City. It allows residents to report traffic accidents, road obstructions, and seek assistance for traffic-related issues.
        </Text>
      </View>
      <View style={styles.emergencyNumberContainer}>
        <Text style={styles.emergencyTitle}>Cebu Provincial Police Office((032) 255-7646)</Text>
        <Text style={styles.emergencyText}>Hotline: (032) 255-7646</Text>
        <Text style={styles.emergencyDescription}>
          This hotline connects callers to the Cebu Provincial Police Office. It is used for reporting crimes, seeking assistance during emergencies, and contacting local law enforcement authorities within the province of Cebu.
        </Text>
      </View>
      <View style={styles.emergencyNumberContainer}>
        <Text style={styles.emergencyTitle}>Emergency Rescue Unit Foundation</Text>
        <Text style={styles.emergencyText}>Hotline: (032) 232-2765 or 161</Text>
        <Text style={styles.emergencyDescription}>
          ERUF Cebu hotline is dedicated to providing ambulance services and emergency medical assistance within Cebu. Callers can request ambulances, medical aid, and seek help during medical emergencies.
        </Text>
      </View>
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
  emergencyNumberContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginBottom: 10,
  },
  emergencyTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    fontWeight: '700',
    color: '#373f46',
    marginBottom: 5,
  },
  emergencyText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    fontWeight: '500',
    color: '#ff6d00',
    marginBottom: 5,
  },
  emergencyDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: '#373f46',
  },
});

export default EmergencyNumber;
