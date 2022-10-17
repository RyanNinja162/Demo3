import React from "react";
import { Button, TextInput, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
// import { addCat, updateCat } from "../redux/actions";
import { updateCat, addCat, toasterBackColor, toggleToaster, toasterMessage } from "../redux/counter";
// import { toggleToaster, setToasterBackgroundColor, setToasterMessage } from "../redux/actions";

// Validations for Form
const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    breed: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string().min(8, 'Too short').required('Required'),
});


const AddForm = (props) => {
    const dispatch = useDispatch();

    const { selectedId, setSelectedId, setShowForm, formData } = props;

    const { cats } = useSelector(s => s.catsList);

    // Function call on form submit after validating the fields
    const handleFormSubmit = (values, resetForm) => {
        const { name, description, breed } = values;

        // Based on id decides whether to edit or add to make the same form  reusable
        if (selectedId) {
            const data = { id: selectedId, name: name, description: description, breed: breed }
            dispatch(updateCat(data));
            dispatch(toasterMessage("Cat Edited Successfully"));
        } else {
            const data = { id: cats.length, name: name, description: description, breed: breed }
            dispatch(addCat(data));
            dispatch(toasterMessage("Cat added Successfully"));
        }
        setSelectedId(0)
        setShowForm(false)
        resetForm({ name: "", breed: "", description: "" })
        dispatch(toasterBackColor("green"));
        dispatch(toggleToaster());
    }

    // function when form edit or add is canceled
    const handleCancel = () => {
        setShowForm(false);
    }

    return (
        <SafeAreaView>
            <Text style={styles.heading}>Add a New Cat</Text>
            {/* Formik for Form handling */}
            <Formik
                initialValues={formData}
                onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
                validationSchema={SignupSchema}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Name"
                                style={styles.input}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Breed"
                                style={styles.input}
                                onChangeText={handleChange('breed')}
                                onBlur={handleBlur('breed')}
                                value={values.breed}
                            />
                            {errors.breed && <Text style={styles.errorText}>{errors.breed}</Text>}
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Description"
                                style={styles.input}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                            />
                            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
                        </View>

                        <View style={styles.button}>
                            <TouchableOpacity onPress={handleCancel} style={{ backgroundColor: "#fff", borderWidth: 1, flexGrow: 1, alignItems: "center", paddingVertical: 6, marginRight: 6, borderRadius: 10 }}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: "blue", borderWidth: 1, flexGrow: 1, alignItems: "center", paddingVertical: 6, borderRadius: 10 }}>
                                <Text style={{ color: "#fff" }}>{selectedId ? "Save" : "Add"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        // margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    heading: {
        fontSize: 20,
        marginLeft: 12,
        color: "#000",
        fontWeight: "bold"
    },
    button: {
        padding: 10,
        flexDirection: "row",
        flexGrow: 1,
    },
    inputContainer: {
        margin: 12
    },
    errorText: {
        color: "red"
    }
});

export default AddForm;