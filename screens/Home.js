import React, { useLayoutEffect, useState  } from "react";
import { StyleSheet, Text, View, TouchableOpacity,ActivityIndicator,ImageBackground,
    SafeAreaView,
    ScrollView, } from "react-native";
import { useFonts } from 'expo-font';
import { Ionicons } from "@expo/vector-icons";



const renderSettings = (navigation) => {
    return (
        <View style={{ position: 'absolute', top: 15, right: 20 }}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Settings")}
            >
                <Ionicons name="settings" size={25} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => renderSettings(navigation),
        });
    });

    const [loaded] = useFonts({
        'Righteous-Regular': require('../assets/fonts/Righteous-Regular.ttf'),
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    });

    

    const [fontsLoaded] = useFonts({
      'Righteous-Regular': require('../assets/fonts/Righteous-Regular.ttf'),
      'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
      // Fonts are still loading, display a loader
      return (
          <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fe8302" />
          </View>
      );
  }

    console.log("Rendering Home screen...");

    const navigateToRiskDetector = () => {
        navigation.navigate("Risk Detector");
    };

    const navigateToFirstAidTraining = () => {
        navigation.navigate("First Aid Training");
    };

    const navigateToEmergencyNumbers = () => {
        navigation.navigate("Emergency Number");
    };


    return (

        <View style={styles.container}>
          <View style={styles.header}>
          <Text style={styles.subtitle}>matngon</Text>
            <Text style={styles.title}>Welcome!</Text>
            {renderSettings(navigation)}
          </View>
          <View style={styles.imageContainer}>
            <ImageBackground
                source={require('../assets/images/logo.png')}
                style={styles.image}
              resizeMode='cover'
            />
            <Text style={styles.beCarefulText}>Be Careful</Text>
          </View>
          <View style={styles.cardContainer}>
          <TouchableOpacity onPress={navigateToRiskDetector}>
          <View style={styles.card}>
            <ImageBackground
              source={require('../assets/images/home-icon-1.png')}
              style={styles.cardImage}
              resizeMode='cover'
            />
            <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Risk Detector</Text>
            <Text style={styles.cardText}>
              Using your camera it will give you warning to various obstructions
              that can injure you.
            </Text>
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToFirstAidTraining}>
          <View style={styles.card}>
            <ImageBackground
              source={require('../assets/images/home-icon-2.png')}
              style={styles.cardImage}
              resizeMode='cover'
            />
            <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>First Aid Training</Text>
            <Text style={styles.cardText}>
              A module to learn how to apply first aid especially during emergency
              situation.
            </Text>
            </View>
          </View>
          </TouchableOpacity>
            <TouchableOpacity onPress={navigateToEmergencyNumbers}>
          <View style={styles.card}>
            <ImageBackground
              source={require('../assets/images/home-icon-3.png')}
              style={styles.cardImage}
              resizeMode='cover'
            />
            <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Emergency Numbers</Text>
            <Text style={styles.cardText}>
              In case of emergency look to this page.
            </Text>
            </View>
          </View>
          </TouchableOpacity>
          </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "stretch",
      },
      loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cardContainer: {
        paddingHorizontal: 20, // Add horizontal padding to the container
        paddingTop: 10, // Add top padding to the container
        paddingBottom: 75,
      },
      header: {
        backgroundColor: '#fe8302',
        paddingTop: 35,
        paddingHorizontal: 10,
        marginBottom: 10,
        paddingBottom: 15,
      },
      beCarefulText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 35,
        fontWeight: '700',
        color: '#111827',
        marginTop: 10,
    },
      title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 35,
        fontWeight: '700',
        color: '#ffffff',
        marginLeft: 10,
      },
      subtitle: {
        fontFamily: 'Righteous-Regular',
        fontSize: 25,
        color: '#ffd181',
        marginLeft: 10,

      },
      imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
      },
      image: {
        width: 110,
        height: 102,
      },
      card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#000000',
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Center items vertically

      },
      cardImage: {
        width: 107,
        height: 89,
      },
      cardContent: {
        flex: 1, // Take remaining space
    },
      cardTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginTop: 10,
        marginLeft: 10,
      },
      cardText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 10,
        fontWeight: '300',
        color: '#111827',
        marginHorizontal: 10,
        marginBottom: 10,
      },
});
