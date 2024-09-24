// import {createSlice} from '@reduxjs/toolkit';

// const initialAuthState = {
//     isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
// };
// const authSlice = createSlice({
//     name: 'auth',
//     initialState: initialAuthState,
//     reducers: {
//         login(state) {
//             state.isAuthenticated = true;
//         },
//         logout(state) {
//             state.isAuthenticated = false;
//         },
//     },
// });
// export const authActions = authSlice.actions

// export default authSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    isAdmin: JSON.parse(localStorage.getItem('isAdmin')) || false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            console.log("sttttttt", state)
            if (state.isAdmin) {
               
                state.isAuthenticated = false;
                 localStorage.setItem('isAdmin', JSON.stringify(state.isAdmin));
            } else {
                
                state.isAuthenticated = true;
               
                localStorage.setItem('isAuthenticated', JSON.stringify(true));  
            }
            
        },
        logout(state) {
            state.isAuthenticated = false;
            state.isAdmin = false;
            localStorage.setItem('isAuthenticated', JSON.stringify(false));
            localStorage.setItem('isAdmin', JSON.stringify(false));
        },
        setAdmin(state, action) {
         
            state.isAdmin = action.payload;
            state.isAuthenticated = false;
            localStorage.setItem('isAdmin', JSON.stringify(state.isAdmin));
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
