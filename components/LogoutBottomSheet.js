import React, { useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const LogOutBottomSheet = ({ setStatus }) => {
    const slide = useRef(new Animated.Value(300)).current;

    const slideUp = () => {
        Animated.timing(slide, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start();
    };
    
    const slideDown = () => {
        Animated.timing(slide, {
          toValue: 300,
          duration: 800,
          useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        slideUp();
    }, []);

    const closeModal = () => {
        slideDown();
        setTimeout(() => {
            setStatus(false);
        }, 800);
    };

    const handleLogout = () => {
        firebase.auth().signOut(); // Logout logic
        // After logout logic, you can close the bottom sheet
        closeModal();
    };

    return (
        <TouchableOpacity onPress={closeModal} style={styles.backdrop}>
            <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                <Text style={styles.modaltext}>
                    Are you sure you want to log-out?
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Logout</Text>
                </TouchableOpacity>
            </Animated.View>
        </TouchableOpacity>
    );
};

export default LogOutBottomSheet;

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    bottomSheet: {
        width: '100%',
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    button: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#FF6D00',
        alignItems: 'center',
        marginTop: 15
    },
    modaltext: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 13,
        fontWeight: '500',
        color: '#373f46',
        textAlign: 'center' // Align text to center
    }
});
