import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import configureStore from './src/redux'
import Home from './src/Screens/Home'
import Form from "./src/Screens/Form"
import Navigation from './src/navigation'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/index';
import Tts from 'react-native-tts';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [formData, setFormData] = useState({ name: null, description: null, breed: null });

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        {showForm ? <Form formData={formData} selectedId={selectedId} setSelectedId={setSelectedId} setShowForm={setShowForm} /> : <Home setShowForm={setShowForm} setSelectedId={setSelectedId} setFormData={setFormData} />}
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
