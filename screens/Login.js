import React, { useState } from "react";
import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import Colors from "../constants/Colors";
import Icon from 'react-native-vector-icons/FontAwesome'
import { useFonts } from 'expo-font';
import validator from "validator";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const validateFields = (email, password) => {
    const isValid = {
        email: validator.isEmail(email),
        password: validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }),
    };

    return isValid;
};

const login = (email, password) => {
    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("Logged in!");
        });
};

const createAccount = (email, password) => {
    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
            console.log("Creating user...");
            firebase.firestore().collection("users").doc(user.uid).set({});
        });
};

export default () => {

    const [isCreateMode, setCreateMode] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordReentry, setPasswordReentry] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordReentryError, setPasswordReentryError] = useState("");

    const [loaded] = useFonts({
        'Righteous-Regular': require('../assets/fonts/Righteous-Regular.ttf'),
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    });

    if (!loaded) {
        // Font is still loading, return null or a loading indicator
        return null;
    }
   
    
    return (
        <View style={styles.container }>
            <View style={styles.logoContainer}>
                <Image 
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.header}>matngon</Text>
            </View>
            <View style={{ flex: 1,paddingTop:20,paddingLeft: 20  }}>
                <View style={styles.inputContainer}>
                    <Icon name="envelope-o" size={22} color="#818181" />
                    <TextInput
                        style={styles.input} 
                        placeholder="Enter Email"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        autoCompleteType="email"
                    />
                </View>
                <Text style={styles.errorText}>{emailError}</Text>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={22} color="#818181" />
                    <TextInput
                        style={styles.input} 
                        placeholder="Enter Password"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        autoCompleteType="password"
                    />
                </View>
                <Text style={styles.errorText}>{passwordError}</Text>

                {isCreateMode && (
                    <View style={styles.inputContainer}>
                        <Icon name="lock" size={22} color="#818181" />
                        <TextInput
                            style={styles.input} 
                            placeholder="Re-enter Password"
                            onChangeText={(text) => setPasswordReentry(text)}
                            value={passwordReentry}
                            secureTextEntry={true}
                        />
                    </View>
                )}
                <Text style={styles.errorText}>{passwordReentryError}</Text>

                <TouchableOpacity
                    onPress={() => {
                        setCreateMode(!isCreateMode);
                    }}
                >
                    <Text
                        style={{
                            fontFamily:'Montserrat-Regular',
                            alignSelf: "center",
                            color: Colors.blue,
                            fontSize: 14,
                            marginTop: 10,
                        }}
                    >
                        {isCreateMode
                            ? "Already have an account?"
                            : "Create new account"}
                    </Text>
                </TouchableOpacity>
            </View>

            <Button
                onPress={() => {
                    const isValid = validateFields(email, password);
                    let isAllValid = true;
                    if (!isValid.email) {
                        setEmailError("Please enter a valid email");
                        isAllValid = false;
                    } else {
                        setEmailError("");
                    }

                    if (!isValid.password) {
                        setPasswordError("Password must be at least 8 characters long with numbers, uppercase, lowercase, and symbol characters");
                        isAllValid = false;
                    } else {
                        setPasswordError("");
                    }

                    if (
                        isCreateMode &&
                        passwordReentry !== password
                    ) {
                        setPasswordReentryError("Passwords do not match");
                        isAllValid = false;
                    } else {
                        setPasswordReentryError("");
                    }

                    if (isAllValid) {
                        isCreateMode
                            ? createAccount(email, password)
                            : login(email, password);
                    }
                }}
                buttonStyle={{ backgroundColor: '#FF6D00' }}
                text={isCreateMode ? "Create Account" : "Login"}
            />
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
    logoContainer: {
        alignItems: "center",
        marginTop: 50, // Adjust the marginTop as needed
    },
    logo: {
        width: 100, // Adjust the width and height as needed
        height: 100,
    },
    header: { 
        fontSize: 30, 
        color: "#FFD181", 
        fontFamily: 'Righteous-Regular', // Apply the custom font
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed',
        width: '95%',
        borderRadius: 10,
        height: 60,
        paddingLeft: 20,
        marginTop: 20,
    },
    input: {
        flex: 1,
        fontFamily: 'Montserrat-Regular',
        paddingLeft: 20,
    },
    errorText: {
        color: 'red',
        marginLeft: 20,
    },
});
