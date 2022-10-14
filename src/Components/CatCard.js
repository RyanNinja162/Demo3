import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { deleteCat } from "../redux/actions";
import { useDispatch } from "react-redux";


const SinglePair = ({ first, second }) => {
    return (
        <View style={styles.singlePairContainer}>
            <Text style={styles.firstText}>{first}:</Text>
            <Text>{second}</Text>
        </View>
    )
}

const CatCard = (props) => {
    const dispatch = useDispatch()

    const { data, setSelectedId, setShowForm, setFormData } = props;

    const { id, name, breed, description } = data;

    const DeleteCat = () => {
        dispatch(deleteCat(id));
    }

    const EditCat = () => {
        setSelectedId(id);
        setShowForm(true);
        setFormData({ name: name, breed: breed, description: description })
    }

    return (
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <SinglePair first="name" second={name} />
                <SinglePair first="Breed" second={breed} />
            </View>
            <View>
                <Text style={styles.firstText}>
                    Description
                </Text>
                <Text>
                    {description}
                </Text>
            </View>
            <View style={styles.icons}>
                <TouchableOpacity style={styles.editIcon} onPress={() => EditCat()}>
                    <AntDesign name="edit" size={20} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={DeleteCat}
                >
                    <MaterialCommunityIcons name="delete" size={20} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 20,
        shadowColor: '#52006A',
        elevation: 20,
        backgroundColor: "#fff",
        padding: 10,
        position: "relative",
    },
    deleteButton: {
        position: "absolute",
        top: 5,
        right: 5
    },
    editIcon: {
        marginRight: 6
    },
    icons: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    singlePairContainer: {
        flexDirection: "row"
    },
    firstText: {
        fontWeight: "bold",
        marginRight: 4,
        textTransform: "capitalize"
    },
    firstRow: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
    }
});

export default CatCard