import React from 'react';

import getDayName from '../../utils/getDayName';
import convertDateFormat from '../../utils/convertDateFormat';

import './ForecastItem.sass';

type ForecastItemProps = {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
            text: string;
            icon: string;
        };
    };
};

export const ForecastItem: React.FC<ForecastItemProps> = props => {
    const { date, day } = props;

    const dayName = getDayName(date, 'en-US');
    const formatDate = convertDateFormat(date);

    return (
        <div className="forecast-item">
            <p className="forecast-item__day">{dayName}</p>
            <p className="forecast-item__date">{formatDate}</p>
            <img
                className="forecast-item__icon"
                src={day.condition.icon}
                alt={day.condition.text}
            />
            <p className="forecast-item__txt">{day.condition.text}</p>
            <p className="forecast-item__temp">
                <span>
                    {Math.round(day.mintemp_c)}
                    <sup>°</sup>C
                </span>
                <span className="separate">/</span>
                <span>
                    {Math.round(day.maxtemp_c)}
                    <sup>°</sup>C
                </span>
            </p>
        </div>
    );
};
