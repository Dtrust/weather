import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { useAPPDispatch } from '../../store/store';
import { selectForecast } from '../../store/forecastWeather/selectors';
import { ForecastItemType } from '../../store/forecastWeather/types';
import { StatusEnum } from '../../store/types';
import { setForecastDays } from '../../store/user/slice';
import {
    selectUserCity,
    selectUserForecast,
    selectUserStatus,
} from '../../store/user/selectors';
import { fetchForecastWeather } from '../../store/forecastWeather/actions';

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

    const city = useSelector(selectUserCity);
    const userStatus = useSelector(selectUserStatus);
    const forecastDays = useSelector(selectUserForecast) || '';

    const { forecastItems, forecastStatus } = useSelector(selectForecast);

    React.useEffect(() => {
        if (city) {
            dispatch(fetchForecastWeather());
        }
    }, [dispatch, city]);

    const onChangeForecast = (
        event: React.MouseEvent<HTMLButtonElement>,
        forecastDays: string
    ) => {
        const dataDay = event.currentTarget.getAttribute('data-day');

        dispatch(setForecastDays(dataDay));

        forecastDays = dataDay as string;

        if (forecastItems.length < +forecastDays) {
            dispatch(fetchForecastWeather());
        }
    };

    const skeleton = (forecastDays: number) =>
        [...new Array(forecastDays)].map((_, index) => (
            <SkeletonForecastItem key={index} />
        ));

    const forecast = forecastItems
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
            forecastStatus === StatusEnum.ERROR ? (
                <></>
            ) : (
                <div className="container forecast-content">
                    <h2 className="block-title forecast-title">Forecast</h2>
                    <div className="forecast-wrap">{buttons}</div>
                    <div className="forecast-list">
                        {forecastStatus === StatusEnum.LOADING
                            ? skeleton(+forecastDays)
                            : forecast}
                    </div>
                </div>
            )}
        </section>
    );
};
