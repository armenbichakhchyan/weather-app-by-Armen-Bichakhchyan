export interface Place {
    name: string;
    sys: {
        country: string;
    };
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        temp_min?: number;
        temp_max?: number;
        pressure?: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        deg?: number;
    };
    coord?: {
        lat: number;
        lon: number;
    };
}

export interface PlaceState {
    place: Place | null
    loading: boolean
    error: string | null
}

export const placeInitialState: PlaceState = {
    place: null,
    loading: false,
    error: null,
}