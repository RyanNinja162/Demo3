import React from "react";
import { View, Text, StyleSheet } from "react-native"

const ListEmpty = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.content}>No Cat added!!</Text>
            <Text style={styles.content}>Start adding One now </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        fontWeight: "bold",
        fontSize: 24
    }
});

export default ListEmpty;