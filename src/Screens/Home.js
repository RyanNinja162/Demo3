import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import CatCard from "../Components/CatCard";
import Ionicons from "react-native-vector-icons/Ionicons";

const data = [1, 2, 3, 4, 5, 6, 7, 8]

const Home = (props) => {

    const { setShowForm, setSelectedId, setFormData } = props;

    const { cats } = useSelector(s => s.catsList);

    const renderItem = ({ item }) => (
        <CatCard data={item} setSelectedId={setSelectedId} setShowForm={setShowForm} setFormData={setFormData} />
    );

    const handleAdd = () => {
        setShowForm(true);
        setSelectedId(0);
        setFormData({ name: null, breed: null, description: null });
    }

    return (
        <View style={{ flex: 1, position: "relative" }}>
            <FlatList
                data={cats}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity onPress={handleAdd} style={styles.addIcon}>
                <Ionicons name="add" color="#000" size={30} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    addIcon: {
        position: "absolute",
        bottom: 30,
        right: 30,
        zIndex: 10,
        padding: 6,
        shadowColor: '#52006A',
        elevation: 20,
        backgroundColor: "#fff",
        borderRadius: 100
    },
});

export default Home;