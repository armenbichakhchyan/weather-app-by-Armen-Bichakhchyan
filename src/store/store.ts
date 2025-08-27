import { configureStore} from "@reduxjs/toolkit";
import searchedCountry  from './reducer/placeSlice.ts'
import location from './reducer/location.ts'

export const store = configureStore({
    reducer: {
        countryReducer: searchedCountry,
        location: location
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch