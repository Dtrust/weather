import React from 'react';
import { useSelector } from 'react-redux';

import { useAPPDispatch } from '../../store/store';
import { fetchCurrentWeather } from '../../store/currentWeather/actions';
import { fetchUserLocation } from '../../store/user/actions';
import { selectUserCity, selectUserStatus } from '../../store/user/selectors';
import { IUser } from '../../store/user/types';
import { StatusEnum } from '../../store/types';
import { selectCurrentWeather } from '../../store/currentWeather/selectors';

import { ErrorBlock } from '../ErrorBlock';
import { SkeletonCurrentWeather } from './SkeletonCurrentWeather';

import './CurrentWeather.sass';
import icons from '../../assets/images/icons.svg';

export const CurrentWeather: React.FC = () => {
    const dispatch = useAPPDispatch();

    const { current, currentWeatherStatus } = useSelector(selectCurrentWeather);

    const city: string = useSelector(selectUserCity) || '';
    const userStatus = useSelector(selectUserStatus) as IUser;

    React.useEffect(() => {
        dispatch(fetchUserLocation());
    }, [dispatch]);

    React.useEffect(() => {
        if (city) {
            dispatch(fetchCurrentWeather());
        }
    }, [dispatch, city]);

    return (
        <section className="block current">
            <div className="container current-content">
                {userStatus === StatusEnum.ERROR ||
                currentWeatherStatus === StatusEnum.ERROR ? (
                    <ErrorBlock message="Sorry Your location was not found. Please use the search field and enter your city" />
                ) : (
                    <>
                        {userStatus === StatusEnum.LOADING ||
                        currentWeatherStatus === StatusEnum.LOADING ? (
                            <SkeletonCurrentWeather />
                        ) : (
                            <>
                                <h2 className="block-title current-title">
                                    Current Weather
                                </h2>
                                <h3 className="current-weather__city">
                                    {city}
                                </h3>
                                <div className="current-wrap">
                                    <div className="current-weather">
                                        <div className="current-weather__wrap">
                                            <div className="current-weather__temp">
                                                <img
                                                    className="current-weather__icon"
                                                    src={current.condition.icon}
                                                    alt={current.condition.text}
                                                />
                                                <span className="current-weather__temp">
                                                    {Math.round(current.temp_c)}
                                                    <sup>°</sup>C
                                                </span>
                                            </div>
                                            <p className="current-weather__txt">
                                                {current.condition.text}
                                            </p>
                                        </div>
                                        <div className="current-weather__wrap">
                                            <p className="current-weather__feel">
                                                <span>Feels Like</span>
                                                <span>
                                                    {Math.round(
                                                        current.feelslike_c
                                                    )}
                                                    <sup>°</sup>C
                                                </span>
                                            </p>
                                            <div className="current-weather__option option">
                                                <svg
                                                    className="option-icon"
                                                    width="20"
                                                    height="20"
                                                >
                                                    <use
                                                        href={`${icons}#humidity`}
                                                    />
                                                </svg>
                                                <p className="option-txt">
                                                    <span className="txt">
                                                        Humidity
                                                    </span>
                                                    <span className="count">
                                                        {current.humidity}
                                                    </span>
                                                    <span className="marker">
                                                        %
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="current-weather__option option">
                                                <svg
                                                    className="option-icon"
                                                    width="20"
                                                    height="20"
                                                >
                                                    <use
                                                        href={`${icons}#pressure`}
                                                    />
                                                </svg>
                                                <p className="option-txt">
                                                    <span className="txt">
                                                        Pressure
                                                    </span>
                                                    <span className="count">
                                                        {current.pressure_mb}
                                                    </span>
                                                    <span className="marker">
                                                        hPa
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="current-weather__option option">
                                                <svg
                                                    className="option-icon"
                                                    width="20"
                                                    height="20"
                                                >
                                                    <use
                                                        href={`${icons}#wind`}
                                                    />
                                                </svg>
                                                <p className="option-txt">
                                                    <span className="txt">
                                                        Wind
                                                    </span>
                                                    <span className="count">
                                                        {current.wind_kph}
                                                    </span>
                                                    <span className="marker">
                                                        kph
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};
