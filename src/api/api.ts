import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
});

class ApiWeather {
    static getLocation({latitude, longitude, limit = 1}: {
        latitude: number;
        longitude: number;
        limit?: number;
    }) {
        return api.get('/location', {
            params: { lat: latitude, lon: longitude, limit: limit },
        });
    }

    static getCountrySearched({search, latitude, longitude}: {search?: string; latitude?: number; longitude?: number}) {
        const params: any = {};

        if (search) {
            params.q = search;
        } else if (latitude && longitude) {
            params.lat = latitude;
            params.lon = longitude;
        }

        return api.get('/weather', { params });
    }

    static getPlaceName({q, limit = 1}: {q?: string; limit?: number}) {
        return api.get('/search-name-of-place', {
            params: { q: q, limit: limit },
        })
    }
}

export default ApiWeather;
