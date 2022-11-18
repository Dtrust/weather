import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { useAPPDispatch } from '../../store/store';
import { selectWeather } from '../../store/weather/selectors';
import { ForecastItemType, StatusEnum } from '../../store/weather/types';
import { setForecastDays } from '../../store/user/slice';
import { selectUser, selectUserForecast } from '../../store/user/selectors';
import { fetchWeather } from '../../store/weather/actions';

import { ForecastItem } from '../ForecastItem';
import { SkeletonForecastItem } from '../ForecastItem/SkeletonForecastItem';

import './Forecast.sass';

const forecastBtns = [
    { id: 0, text: '3 days', days: '3' },
    { id: 1, text: '7 days', days: '7' },
    { id: 2, text: '14 days', days: '14' },
];

export const Forecast: React.FC = () => {
    const dispatch = useAPPDispatch();

    const { userStatus } = useSelector(selectUser);
    const forecastDays = useSelector(selectUserForecast) || '';

    const { forecast, weatherStatus } = useSelector(selectWeather);

    const onChangeForecast = (
        event: React.MouseEvent<HTMLButtonElement>,
        forecastDays: string
    ) => {
        const dataDay = event.currentTarget.getAttribute('data-day');

        dispatch(setForecastDays(dataDay));

        forecastDays = dataDay as string;

        if (forecast.length < +forecastDays) {
            dispatch(fetchWeather());
        }
    };

    const skeleton = (forecastDays: number) =>
        [...new Array(forecastDays)].map((_, index) => (
            <SkeletonForecastItem key={index} />
        ));

    const forecastItems = forecast
        .map((obj: ForecastItemType, index) => (
            <ForecastItem key={index} {...obj} />
        ))
        .slice(0, +forecastDays);

    const buttons = forecastBtns.map(({ id, text, days }) => {
        return (
            <button
                key={id}
                onClick={e => onChangeForecast(e, forecastDays)}
                className={classNames(
                    'btn forecast-btn',
                    forecastDays === days ? 'active' : ''
                )}
                data-day={days}
            >
                {text}
            </button>
        );
    });

    return (
        <section className="block forecast">
            {userStatus === StatusEnum.ERROR ||
            weatherStatus === StatusEnum.ERROR ? (
                <></>
            ) : (
                <div className="container forecast-content">
                    <h2 className="block-title forecast-title">Forecast</h2>
                    <div className="forecast-wrap">{buttons}</div>
                    <div className="forecast-list">
                        {weatherStatus === StatusEnum.LOADING
                            ? skeleton(+forecastDays)
                            : forecastItems}
                    </div>
                </div>
            )}
        </section>
    );
};
