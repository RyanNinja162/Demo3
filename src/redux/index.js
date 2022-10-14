import { createStore, combineReducers } from 'redux';
import catReducer from '../redux/reducers/index';
import storage from 'redux-persist/lib/storage' 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

const rootReducer = combineReducers(
    { catsList: catReducer }
);

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)

// const configureStore = () => {
//     return createStore(rootReducer);
// }
// export default configureStore;
export const persistor = persistStore(store)
