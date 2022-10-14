import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../Screens/Home";
import Form from "../Screens/Form";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }}
                />
                <Stack.Screen name="Form" component={Form} options={{ title: 'Form' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;