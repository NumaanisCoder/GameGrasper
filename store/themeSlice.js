const { createSlice } = require("@reduxjs/toolkit");

 

const themeSlice = createSlice({
    name:"themeSice",
    initialState:{
        isDarkMode: false
    },
    reducers: {
        toggelTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
        }
    }
})

export const {toggelTheme} = themeSlice.actions;
export default themeSlice.reducer;