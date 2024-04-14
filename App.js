import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Login from "./screens/Login";
import Home from "./screens/Home";
import RiskDetector from "./screens/RiskDetector";
import FirstAidTraining from "./screens/FirstAidTraining";
import EmergencyNumber from "./screens/EmergencyNumber";
import ModuleOne from "./screens/ModuleOne";
import ModuleTwo from "./screens/ModuleTwo";
import ModuleThree from "./screens/ModuleThree";


const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
    return (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={Login} />
      </AuthStack.Navigator>
    );
};

const Screens = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Fire App" component={Home} />
            <Stack.Screen name="Risk Detector" component={RiskDetector} />
            <Stack.Screen name="First Aid Training" component={FirstAidTraining} />
            <Stack.Screen name="Emergency Number" component={EmergencyNumber} />
            <Stack.Screen name="Module One" component={ModuleOne} />
            <Stack.Screen name="Module Two" component={ModuleTwo} />
            <Stack.Screen name="Module Three" component={ModuleThree} />

        </Stack.Navigator>
    );
};

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setIsAuthenticated(!!user);
        });

        return unsubscribe;
    }, []);

    return (
        <NavigationContainer>
            <View style={{ flex: 1 }}>
                {isAuthenticated ? <Screens /> : <AuthScreens />}
            </View>
        </NavigationContainer>
    );
}


const firebaseConfig = {
  apiKey: "AIzaSyDqRTUP9EjGzPlJ3j5H0uJn3NW6ZAh8Zl0",
  authDomain: "matngon-9db8d.firebaseapp.com",
  projectId: "matngon-9db8d",
  storageBucket: "matngon-9db8d.appspot.com",
  messagingSenderId: "446309797556",
  appId: "1:446309797556:web:9cb483ab41fcfa379d51e1"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}