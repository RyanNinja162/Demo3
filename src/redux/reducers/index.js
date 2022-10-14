import { DELETE_CAT, ADD_CAT, UPDATE_CAT, TOASTER_MESSAGE, TOGGLE_TOASTER, TOASTER_BACK_COLOR } from '../actions/types';

const initialState = {
    cats: [],
    toasterBackgroundColor: "#fff",
    toasterMessage: "dummy",
    showToaster: true,
};

const catReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_CAT:
            return {
                ...state,
                cats: state.cats.filter(item => {
                    return item.id !== action.payload;
                })
            };
        case ADD_CAT:
            return {
                ...state,
                cats: [...state.cats, action.payload]
            };
        case TOASTER_MESSAGE:
            return {
                ...state,
                toasterMessage: action.payload
            };
        case "TOASTER_BACK_COLOR":
            return {
                ...state,
                toasterBackgroundColor: action.payload
            };
        case TOGGLE_TOASTER:
            return {
                ...state,
                showToaster: !state.showToaster
            };
        case 'UPDATE_CAT':
            const { id } = action.payload;
            const newState = state.cats.map(obj => {
                // 👇️ if id equals 2, update country property
                if (obj.id === id) {
                    return action.payload;
                }
                // 👇️ otherwise return object as is
                return obj;
            });

            return {
                ...state,
                cats: newState
            };
        default:
            return state;
    }
}
export default catReducer;