import React, { useState } from "react";
import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInputs";
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
    const [emailField, setEmailField] = useState({
        text: "",
        errorMessage: "",
    });
    const [passwordField, setPasswordField] = useState({
        text: "",
        errorMessage: "",
    });
    const [passwordReentryField, setPasswordReentryField] = useState({
        text: "",
        errorMessage: "",
    });

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
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', width: '95%', borderRadius: 10, height: 60, paddingLeft: 20 }}>
                    <Icon name="envelope-o" size={22} color="#818181" />
                    <TextInput
                        label="Email"
                        text={emailField.text}
                        onChangeText={(text) => {
                            setEmailField({ text });
                        }}
                        errorMessage={emailField.errorMessage}
                        style={styles.input} 
                        placeholder="Enter Email"
                        labelStyle={styles.input}
                        autoCompleteType="email"
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', width: '95%', borderRadius: 10, height: 60, paddingLeft: 20, marginTop: 20 }}>
                    <Icon name="lock" size={22} color="#818181" />
                    <TextInput
                        label="Password"
                        text={passwordField.text}
                        onChangeText={(text) => {
                            setPasswordField({ text });
                        }}
                        style={styles.input} 
                        placeholder="Enter Password"
                        secureTextEntry={true}
                        errorMessage={passwordField.errorMessage}
                        labelStyle={styles.input}
                        autoCompleteType="password"
                    />
                </View>

                {isCreateMode && (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', width: '95%', borderRadius: 10, height: 60, paddingLeft: 20, marginTop: 20 }}>
                        <Icon name="lock" size={22} color="#818181" />
                        <TextInput
                            label="Re-enter Password"
                            text={passwordReentryField.text}
                            onChangeText={(text) => {
                                setPasswordReentryField({ text });
                            }}
                            style={styles.input} 
                            placeholder="Re-enter Password"
                            secureTextEntry={true}
                            errorMessage={passwordReentryField.errorMessage}
                            labelStyle={styles.label}
                        />
                    </View>
                )}
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
                    const isValid = validateFields(
                        emailField.text,
                        passwordField.text
                    );
                    let isAllValid = true;
                    if (!isValid.email) {
                        emailField.errorMessage = "Please enter a valid email";
                        setEmailField({ ...emailField });
                        isAllValid = false;
                    }

                    if (!isValid.password) {
                        passwordField.errorMessage =
                            "Password must be at least 8 long w/numbers, uppercase, lowercase, and symbol characters";
                        setPasswordField({ ...passwordField });
                        isAllValid = false;
                    }

                    if (
                        isCreateMode &&
                        passwordReentryField.text != passwordField.text
                    ) {
                        passwordReentryField.errorMessage =
                            "Passwords do not match";
                        setPasswordReentryField({ ...passwordReentryField });
                        isAllValid = false;
                    }

                    if (isAllValid) {
                        isCreateMode
                            ? createAccount(emailField.text, passwordField.text)
                            : login(emailField.text, passwordField.text);
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
    label: { 
        fontSize: 16, 
        fontWeight: "bold", 
        color: Colors.black,
        fontFamily: 'Montserrat-Regular', // Apply the custom font
    },
    input:{
        position:'relative',
        height:'100%',
        width:'90%',
        fontFamily:'Montserrat-Regular',
        paddingLeft:20,
    },
});