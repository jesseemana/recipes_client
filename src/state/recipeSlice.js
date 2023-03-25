import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    access_token: null,
    refresh_token: null,
    recipes: []
};

const recipesSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        setLogin: function(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: function(state, action) {
            state.user = null;
            state.access_token = null;
            state.refresh_token = null;
        },
        setRecipes: function(state, action) {
            state.recipes = action.payload.recipes;
        },
    }
});

export const {setLogin, setLogout, setRecipes} = recipesSlice.actions
export default recipesSlice.reducer