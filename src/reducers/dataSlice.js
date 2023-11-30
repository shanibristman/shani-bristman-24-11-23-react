import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = 'GevAS1AAdErEBrfFTPJF1SteZnctlINW'

export const fetchSearchData = createAsyncThunk('data/searchData', async (text) => {
    const res = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${text}`)
    const data = await res.json()

    return data;
})

export const fetchCurrent = createAsyncThunk('data/fetchCurrent', async (_, thunkAPI) => {

    const { currentKey } = thunkAPI.getState().data

    const res = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${currentKey}?apikey=${API_KEY}`);
    const data = await res.json();

    return data;
})

export const fetchAllWeek = createAsyncThunk('data/fetchAllWeek', async (_, thunkAPI) => {

    const { currentKey } = thunkAPI.getState().data

    const res = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${currentKey}?apikey=${API_KEY}&metric=true`)
    const data = await res.json()

    return data;
})

const dataSlice = createSlice({
    name: 'data',
    initialState: {

        currentCity: "Tel Aviv",
        currentKey: "215854",

        current: [],
        statusCurrent: 'idle',
        errorCurrent: null,

        allWeek: {},
        statusAllWeek: 'idle',
        errorAllWeek: null,

        search: {},
        statusSearch: "idle",
        errorSearch: null,

        darkMode: false

    },
    reducers: {

        changeKey: (state, code) => {
            state.currentKey = code.payload;
        },

        changeCity: (state, city) => {
            state.currentCity = city.payload;
        },

        changeDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrent.pending, (state) => {
                state.statusCurrent = 'loading';
            })
            .addCase(fetchCurrent.fulfilled, (state, action) => {
                state.statusCurrent = 'succeeded';
                state.current = action.payload;

            })
            .addCase(fetchCurrent.rejected, (state, action) => {
                state.statusCurrent = 'failed';
                state.errorCurrent = action.error.message;
            })
            .addCase(fetchAllWeek.pending, (state) => {
                state.statusAllWeek = 'loading';
            })
            .addCase(fetchAllWeek.fulfilled, (state, action) => {
                state.statusAllWeek = 'succeeded';
                state.allWeek = action.payload;
            })
            .addCase(fetchAllWeek.rejected, (state, action) => {
                state.statusAllWeek = 'failed';
                state.errorAllWeek = action.error.message;
            })
            .addCase(fetchSearchData.pending, (state) => {
                state.statusSearch = 'loading';
            })
            .addCase(fetchSearchData.fulfilled, (state, action) => {
                state.statusSearch = 'succeeded';
                state.search = action.payload;
            })
            .addCase(fetchSearchData.rejected, (state, action) => {
                state.statusSearch = 'failed';
                state.errorSearch = action.error.message;
            })
    },
});

export const { changeKey, changeCity, changeDarkMode } = dataSlice.actions;
export default dataSlice.reducer;
