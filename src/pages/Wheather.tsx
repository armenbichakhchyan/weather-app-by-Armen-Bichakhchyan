import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import type {AppDispatch, RootState} from '../store/store.ts';
import {getCountrySearched, getLocation, getPlaceName} from "../store/actions/getPlaceAction.ts";
import Input from "../Components/Input/Input.tsx";
import {Thermometer,  Droplet, Wind} from 'lucide-react'
import Loading from '../Components/Loading/Loading.tsx'


const Wheather = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { location, loading: locationLoading } = useSelector((state: RootState) => state.location);
    const { place, loading: placeLoading } = useSelector((state: RootState) => state.countryReducer);

    const [search, setSearch] = useState('');
    const [unit, setUnit] = useState<'C' | 'F'>('C');

    const getCoords = () =>
        new Promise<GeolocationCoordinates>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position.coords),
                (error) => reject(error)
            )
        })

    useEffect(() => {
        (async () => {
            try {
                const coords = await getCoords();

                const { latitude, longitude } = coords;

                 dispatch(getLocation({ latitude, longitude })).unwrap();

                 dispatch(getCountrySearched({ latitude, longitude })).unwrap();
            } catch (err) {
                console.error('Error getting location:', err);
            }
        })();
    }, [dispatch]);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setSearch(value);
    };

    const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const city = search.trim();
        if (!city) return;

        try {
            const locRes = await dispatch(getPlaceName({ q: city, limit: 1 })).unwrap();
            if (!locRes?.[0]) return;

            const { lat, lon } = locRes[0];

            dispatch(getCountrySearched({ latitude: lat, longitude: lon }));
        } catch (err) {
            console.error(err);
        }
    };


    const getCountryFullName =(code?: string, locale: string = "en")=> {
        if (!code) return "";

        const regionNames = new Intl.DisplayNames([locale], { type: "region" });

        return regionNames.of(code.toUpperCase());
    }


    const convertTemp =(temp: number, to: 'C' | 'F')=> {
        if(to === 'F') {
            return (temp * 9/5) + 32
        }

        return temp
    }


    return (
        <div className="wrapper">
            <div className="wheather__layout">
                <div className="layout-top">
                    <h1 className="wheather__city">
                        {location?.[0]?.local_names?.en ?? location?.[0]?.name} {' '}
                        {location?.[0]?.state} {' '}
                        {getCountryFullName(location?.[0]?.country)}
                    </h1>

                    <form onSubmit={onSearchSubmit} className='search__form'>
                        <Input
                            type="text"
                            value={search}
                            name="search"
                            onChange={onSearch}
                            classname="country__search"
                            placeholder="Search city..."
                        />

                        <button type="submit" className='submit__btn'>
                            Search
                        </button>
                    </form>
                </div>

                {locationLoading || placeLoading
                    ? (
                        <Loading />

                    ) : !place ? (

                        <div className="no-location">
                            <p>📍 The location is not connected or there is no data</p>
                        </div>

                    ) : !location.length  && search ? (

                        <div className="not__state__found">
                            Not State Found
                        </div>

                    ) : (
                        <div className="layout-bottom">
                            <div className="layout-bottom-left">
                                <h2>
                                    {typeof place?.main?.temp === "number"
                                        ? convertTemp(place?.main?.temp, unit).toFixed()
                                        : "_"}
                                </h2>

                                <div
                                    className={`temperature__control ${
                                        unit === "F" ? "isCelsius" : ""
                                    }`}
                                >
                                    <button
                                        className={`celsius__btn ${unit === "C" && "active__temp"}`}
                                        onClick={() => setUnit("C")}
                                    >
                                        °C
                                    </button>

                                    <button
                                        className={`fahrenheit__btn ${unit === "F" && "active__temp"}`}
                                        onClick={() => setUnit("F")}
                                    >
                                        °F
                                    </button>
                                </div>
                            </div>

                        <div className="layout-bottom-right">
                            <div className="wheather__icon_block">
                                <img
                                    src={`https://openweathermap.org/img/wn/${place?.weather?.[0]?.icon}@2x.png`}
                                    alt="weather icon"
                                />
                            </div>

                            <div className="wheather__details">
                                <p className="wheather__info">
                                    <Thermometer /> Feels Like: {place?.main?.feels_like}
                                </p>

                                <p className="wheather__info">
                                    <Droplet /> Humidity: {place?.main?.humidity} %
                                </p>

                                <p className="wheather__info">
                                    <Wind /> Wind: {place?.wind?.speed} km / h
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wheather;
