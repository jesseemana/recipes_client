import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    user: null,
    access_token: null,
    refresh_token: null,
    users: [],
    recipes: [],
}


const recipesSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        setLogin: function(state, action) {
            state.user = action.payload.user
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
        },
        setLogout: function(state, action) {
            state.user = null
            state.access_token = null
            state.refresh_token = null
        },
        setRecipes: function(state, action) {
            state.recipes = action.payload.recipes
        },
        setUsers: function(state, action) {
            state.users = action.payload.user
        },
    }
})

export const {setLogin, setLogout, setRecipes, setUsers} = recipesSlice.actions
export default recipesSlice.reducer