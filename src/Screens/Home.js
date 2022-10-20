import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, SafeAreaView, PermissionsAndroid } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CatCard from "../Components/CatCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import ListEmpty from "../Components/ListEmpty";
// import { toggleToaster } from "../redux/actions";
import { toggleToaster } from "../redux/counter";
import * as ImagePicker from "expo-image-picker";
import * as Permission from "expo-permissions";
import { launchCamera, showImagePicker, launchImageLibrary } from "react-native-image-picker";
import CompressImage from 'react-native-compress-image';
import { Image } from 'react-native-compressor';

const Home = (props) => {
    const dispatch = useDispatch()

    const { setShowForm, setSelectedId, setFormData } = props;

    const { cats, showToaster, toasterBackgroundColor, toasterMessage } = useSelector(s => s.catsList);

    // let options = {
    //     // saveToPhotos: true,
    //     mediaType: "photo"
    // }

    let options = {
        title: 'Select Image',
        mediaType: "photo",
        quality: 0.5,
        customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

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

    const pickFromCamera = async () => {
        // const { granted } = await Permissions.askAsync(Permissions.CAMERA)
        if (true) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            console.log(data)
            if (!data.cancelled) {
                let newFile = { uri: data.uri, type: `test/${data.uri.split(".")[1]}`, name: `text.${data.uri.split(".")[1]}` }

                handleUpload(newFile)
            }
        }
        else {
            Alert.alert("you need to give permission to work")
        }
    }

    const openCamera = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Cool Photo App Camera Permission",
                message:
                    "Cool Photo App needs access to your camera " +
                    "so you can take awesome pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        )

        console.log("granted", granted)
        console.log("permission", PermissionsAndroid.RESULTS.GRANTED)

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const result = await launchCamera(options)

            console.log("results", result)

            const uri = result.assets[0].uri

            console.log("uri", uri)
            let newFile = { uri: uri, type: result.assets[0].type, name: uri.split("/").pop() }

            console.log("newFile", newFile)
            console.log("uri", uri)

            // const result2 = await Image.compress(`${uri}`, {
            //     compressionMethod: 'auto',
            // });

            // console.log("result2", result2)

            handleUpload(newFile)
            // console.log("inside if", result)
        }
    }

    const pickFromGallery = () => {
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
            }
        });
    }

    const handleUpload = (image) => {
        const data = new FormData();
        data.append("file", image)
        data.append("upload_preset", "employeeApp");
        data.append("cloud_name", "dez1ir6xd")

        console.log("data", data)

        // fetch("https://cloudinary://291132195717678:GsRyS8Dh7JQQlqY1Gg0J142vN2I@dez1ir6xd/image/upload", {
        // fetch("https://api.cloudinary.com/v1_1/dez1ir6xd/image/upload", {
        fetch("https://api.cloudinary.com/v1_1/dez1ir6xd/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).then(data => console.log("data", data)).catch(err => console.log("err", err))
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
            {/* <TouchableOpacity onPress={handleAdd} style={styles.addIcon}> */}
            {/* <TouchableOpacity onPress={pickFromCamera} style={styles.addIcon}> */}
            <TouchableOpacity onPress={openCamera} style={styles.addIcon}>
                {/* <TouchableOpacity onPress={pickFromGallery} style={styles.addIcon}> */}
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