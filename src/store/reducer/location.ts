import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getLocation, getPlaceName  } from '../actions/getPlaceAction.ts'
import type { Location } from '../../types/location.ts'
import {initialLocationState} from '../../types/location.ts'

const locationSlice = createSlice({
    name: 'location_reducer',
    initialState: initialLocationState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getLocation.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getLocation.fulfilled, (state, action: PayloadAction<Location[]>) => {
                state.loading = false
                state.location = action.payload
            })
            .addCase(getPlaceName.fulfilled, (state, action: PayloadAction<Location[]>) => {
                state.loading = false;
                state.location = action.payload;
            })
            .addCase(getLocation.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Something went wrong'
            })
            .addCase(getPlaceName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Something went wrong";
            });
    }
})

export default locationSlice.reducer;
