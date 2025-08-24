import React from 'react';
import { useSelector } from 'react-redux';

import { useAPPDispatch } from '../../store/store';
import { fetchCurrentWeather } from '../../store/currentWeather/actions';
import {
    selectUserCity,
    selectUserInitialCity,
    selectUserStatus,
} from '../../store/user/selectors';
import { StatusEnum } from '../../store/types';
import { selectCurrentWeather } from '../../store/currentWeather/selectors';

import CurrentOption from './CurrentOption';
import { ErrorBlock } from '../ErrorBlock';
import { SkeletonCurrentWeather } from './SkeletonCurrentWeather';

import './CurrentWeather.sass';

export const CurrentWeather: React.FC = () => {
    const dispatch = useAPPDispatch();

    const { current, currentWeatherStatus } = useSelector(selectCurrentWeather);

    const city = useSelector(selectUserCity) || '';
    const initialCity = useSelector(selectUserInitialCity);
    const userStatus = useSelector(selectUserStatus);

    React.useEffect(() => {
        if (city && city !== initialCity) {
            dispatch(fetchCurrentWeather());
        }
    }, [dispatch, city, initialCity]);

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
                                <h3 className="current-city">{city}</h3>
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
                                            <CurrentOption
                                                currentData={current.humidity}
                                                optionTxt={'Humidity'}
                                                optionMarker={'%'}
                                                optionIcon={'humidity'}
                                            />
                                            <CurrentOption
                                                currentData={
                                                    current.pressure_mb
                                                }
                                                optionTxt={'Pressure'}
                                                optionMarker={'hPa'}
                                                optionIcon={'pressure'}
                                            />
                                            <CurrentOption
                                                currentData={current.wind_kph}
                                                optionTxt={'Wind'}
                                                optionMarker={'kph'}
                                                optionIcon={'wind'}
                                            />
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
