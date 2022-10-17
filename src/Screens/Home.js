import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CatCard from "../Components/CatCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import ListEmpty from "../Components/ListEmpty";
// import { toggleToaster } from "../redux/actions";
import { toggleToaster } from "../redux/counter";

const Home = (props) => {
    const dispatch = useDispatch()

    const { setShowForm, setSelectedId, setFormData } = props;

    const { cats, showToaster, toasterBackgroundColor, toasterMessage } = useSelector(s => s.catsList);

    // UseEffect to handle toaster hide after every 3 sec of display
    useEffect(() => {
        if (showToaster) {
            setTimeout(() => {
                dispatch(toggleToaster())
            }, 3000)
        }
    }, [showToaster])

    // FlatList item component
    const renderItem = ({ item }) => (
        <CatCard data={item} setSelectedId={setSelectedId} setShowForm={setShowForm} setFormData={setFormData} />
    );

    // Function call when we press the floating Add button
    const handleAdd = () => {
        setShowForm(true);
        setSelectedId(0);
        setFormData({ name: "", breed: "", description: "" });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {cats.length ? <Text style={styles.heading}>Have a look at your cats </Text> : null}
            {/* List of all the available cats */}
            <FlatList
                data={cats}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={() => <ListEmpty />}
            />
            <TouchableOpacity onPress={handleAdd} style={styles.addIcon}>
                <Ionicons name="add" color="#000" size={30} />
            </TouchableOpacity>
            {showToaster && <View style={[styles.toaster, { backgroundColor: toasterBackgroundColor }]}>
                <Text style={[styles.toasterTest, { color: "#fff" }]}>{toasterMessage}</Text></View>}
        </SafeAreaView>
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
        backgroundColor: "#fff",
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
    heading: {
        fontSize: 20,
        marginVertical: 14,
        marginLeft: 22,
        fontWeight: "bold",
        color: "#000"
    },
    toaster: {
        position: "absolute",
        bottom: 20,
        right: 10,
        left: 10,
        zIndex: 15,
        padding: 10,
        alignItems: "center",
        borderRadius: 10
    },
    toasterTest: {
        fontSize: 18
    }
});

export default Home;