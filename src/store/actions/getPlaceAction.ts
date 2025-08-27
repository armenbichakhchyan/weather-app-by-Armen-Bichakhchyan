import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiWeather from '../../api/api.ts'
import axios from 'axios'

export const getLocation = createAsyncThunk(
    'location_country',
    async ({ latitude, longitude }: {latitude: number; longitude: number}, thunkAPI) => {
        try {
            const res = await ApiWeather.getLocation({ latitude, longitude });
            return res.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return thunkAPI.rejectWithValue(err.message);
            }
            return thunkAPI.rejectWithValue('Unknown error');
        }
    }
)

export const getCountrySearched = createAsyncThunk(
    'searched_country',
    async ({ search, latitude, longitude }: {search?: string; latitude?: number; longitude?: number}, thunkAPI) => {
        try {
            const res = await ApiWeather.getCountrySearched({ search, latitude, longitude });
            return res.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return thunkAPI.rejectWithValue(err.message);
            }
            return thunkAPI.rejectWithValue('Unknown error');
        }
    }
)


export const getPlaceName = createAsyncThunk(
    'searched_place_full_name',
    async ({ q, limit = 1 }: {q?: string; limit: number}, thunkAPI) => {
        try {
            const res = await ApiWeather.getPlaceName({ q, limit});
            return res.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                return thunkAPI.rejectWithValue(err.message);
            }
            return thunkAPI.rejectWithValue('Unknown error');
        }
    }
)