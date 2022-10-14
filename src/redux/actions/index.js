import { DELETE_CAT, ADD_CAT, UPDATE_CAT } from './types';

// For deleting a cat
export const deleteCat = (id) => ({
    type: DELETE_CAT,
    payload: id,
});

// For adding new cat
export const addCat = (data) => ({
    type: ADD_CAT,
    payload: data
})

// For updating cat
export const updateCat = (data) => ({
    type: 'UPDATE_CAT',
    payload: data
})

// For Hiding and showing toaster
export const toggleToaster = () => ({
    type: 'TOGGLE_TOASTER',
})

// For changing toaster background color
export const setToasterBackgroundColor = (data) => ({
    type: 'TOASTER_BACK_COLOR',
    payload: data
})

// For changing toaster Message
export const setToasterMessage = (data) => ({
    type: 'TOASTER_MESSAGE',
    payload: data
})