import { DELETE_CAT, ADD_CAT, UPDATE_CAT } from '../actions/types';

const initialState = {
    cats: [{
        id: 1,
        name: "Cat1",
        breed: "breed 1",
        description: "this is dummy description 1",
    }, {
        id: 2,
        name: "Cat 2",
        breed: "breed 2",
        description: "this is dummy description 2",
    }, {
        id: 3,
        name: "Cat 3",
        breed: "breed 3",
        description: "this is dummy description 3",
    }, {
        id: 4,
        name: "Cat 4",
        breed: "breed 4",
        description: "this is dummy description 4",
    }, {
        id: 5,
        name: "Cat 5",
        breed: "breed 5",
        description: "this is dummy description 5",
    }, {
        id: 6,
        name: "Cat 6",
        breed: "breed 6",
        description: "this is dummy description 6",
    }]
};

const catReducer = (state = initialState, action) => {
    console.log("action", action)

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
        case 'UPDATE_CAT':
            console.log("updtae api call", action.payload)

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