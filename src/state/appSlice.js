import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import axios from '../api/axios'
const RECIPES_URL = '/recipes'


const initialState = {
    user: null,
    access_token: null,
    refresh_token: null,
    users: [],
    recipes: [],
}


const appSlice = createSlice({
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
    },
})

export const {setLogin, setLogout, setRecipes, setUsers} = appSlice.actions
export default appSlice.reducer


// export const getRecipes = createAsyncThunk('/recipes/fetchAll', async (state, action) => {
//     try {
//         const response = await axios.get(RECIPES_URL, {headers: {Authorization: `Bearer ${initialState.access_token}`}})
//         return response.data
//     } catch (error) {
//         console.log(`An error occured ${error}`)
//     }
// })


    // extraReducers(builder){
    //     builder
    //         .addCase(getRecipes.pending, (state, action) => {
    //             state.status = 'loading'
    //         })
    //         .addCase(getRecipes.fulfilled, (state, action) => {
    //             state.status = 'succeeded'
    //             state.recipes.push(action.payload)
    //         })
    //         .addCase(getRecipes.rejected, (state, action) => {
    //             state.status = 'failed!'
    //             state.error = action.error.message
    //         })
    // }