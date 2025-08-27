export interface Location {
    name: string;
    local_names?: {
        [key: string]: string;
    };
    lat: number;
    lon: number;
    state?: string;
    country: string;
}

export interface LocationState {
    location: Location[];
    loading: boolean;
    error: string | null;
}

export const initialLocationState: LocationState = {
    location: [],
    loading: false,
    error: null,
};