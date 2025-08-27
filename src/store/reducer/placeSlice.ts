import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getCountrySearched } from '../actions/getPlaceAction.ts'
import type { Place } from '../../types/place.ts'
import {placeInitialState} from '../../types/place.ts'



const placeSlice = createSlice({
    name: 'searched-place-reducer',
    initialState: placeInitialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getCountrySearched.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getCountrySearched.fulfilled, (state, action: PayloadAction<Place>) => {
                state.loading = false
                state.place = action.payload
            })
            .addCase(getCountrySearched.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Something went wrong'
            })
    },
})

export default placeSlice.reducer
