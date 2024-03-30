import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';



const FirstAidTraining = ({ navigation }) => {

  const [loaded] = useFonts({
    'Montserrat-SemiBold': require('../assets/fonts/Righteous-Regular.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!loaded) {
    // Font is still loading, return null or a loading indicator
    return null;
}

    const navigateToModuleOne = () => {
      navigation.navigate("Module One");
    };


    const navigateToModuleTwo = () => {
      navigation.navigate("Module Two");
    };

    const navigateToModuleThree = () => {
      navigation.navigate("Module Three");
    };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          {/* Arrow icon to navigate back */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerText}>First Aid 101</Text>
        </View>
        <ImageBackground
          style={styles.headerImage}
          source={require('../assets/images/aid101.jpg')}
          resizeMode='stretch'
        >
        </ImageBackground>
        <View style={styles.cardContainer}>
        <TouchableOpacity onPress={navigateToModuleOne}>
          <View style={styles.infoContainer}>
            <ImageBackground
              style={styles.image}
              source={require('../assets/images/aid.png')}
              resizeMode='cover'
            />
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>First Aid 101</Text>
              <Text style={styles.textDescription}>
                First Aid 101 provides essential knowledge on life-saving
                techniques, covering the ABCs of First Aid (Airway, Breathing,
                Circulation) and the contents of a basic first aid kit.
              </Text>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToModuleTwo}>
          <View style={styles.infoContainer}>
            <ImageBackground
              style={styles.image}
              source={require('../assets/images/bandage.jpg')}
              resizeMode='cover'
            />
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>Bandaging Techniques</Text>
              <Text style={styles.textDescription}>
                Learn how to effectively apply various types of bandages and
                dressings, ensuring proper wound care and support in
                emergencies.
              </Text>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToModuleThree}>
          <View style={styles.infoContainer}>
            <ImageBackground
              style={styles.image}
              source={require('../assets/images/scrape.png')}
              resizeMode='cover'
            />
            <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Treating Minor Cuts and Scrapes</Text>
            <Text style={styles.textDescription}>
              Discover essential steps for treating minor cuts and scrapes,
              including proper wound cleaning, application of antiseptic, and
              dressing techniques to promote healing and prevent infection.
            </Text>
            </View>
          </View>
          </TouchableOpacity>
          </View>
    </View>
  );
};

export default FirstAidTraining;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fb',
    alignItems: 'stretch',
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
    backgroundColor: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(255, 109, 0, 0.20) 75.5%), url(<path-to-image>) lightgray 50% / cover no-repeat',
  },
  cardContainer: {
    paddingHorizontal: 20, // Add horizontal padding to the container
    paddingTop: 10, // Add top padding to the container
    paddingBottom: 75,
  },
  infoContainer: {
    height: 93,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 101,
    height: 93,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  textTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    fontWeight: '700',
    color: '#fe8302',
    marginBottom: 6,
  },
  textDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    fontWeight: '500',
    color: '#373f46',
  },
  bottomImage: {
    width: 360,
    height: 162,
  },
});
