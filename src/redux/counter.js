import { createSlice } from '@reduxjs/toolkit'

export const catSlice = createSlice({
    name: 'catsList',
    initialState: {
        value: 0,
        cats: [],
        toasterBackgroundColor: "#fff",
        toasterMessage: "dummy",
        showToaster: true,
    },
    reducers: {
        deleteCat: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            //   ...state,
            state.cats = state.cats.filter(item => {
                return item.id !== action.payload;
            })
        },
        addCat: (state, action) => {
            state.cats = [...state.cats, action.payload]

        },
        toasterMessage: (state, action) => {
            state.toasterMessage = action.payload

        },
        toasterBackColor: (state, action) => {
            state.toasterBackgroundColor = action.payload
        },
        toggleToaster: (state, action) => {
            state.showToaster = !state.showToaster
        },
        updateCat: (state, action) => {
            const { id } = action.payload;
            const newState = state.cats.map(obj => {
                // 👇️ if id equals 2, update country property
                if (obj.id === id) {
                    return action.payload;
                }
                // 👇️ otherwise return object as is
                return obj;
            });

            state.cats = newState
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { deleteCat, updateCat, toggleToaster, toasterBackColor, toasterMessage, addCat, incrementByAmount } = catSlice.actions

export default catSlice.reducer