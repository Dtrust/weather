import React from 'react';
import debounce from 'lodash.debounce';

import { useAPPDispatch } from '../../store/store';
import {
    resetCitiesList,
    setInitialCity,
    setUserCity,
} from '../../store/user/slice';
import { useSelector } from 'react-redux';
import {
    selectUserCitiesList,
    selectUserCitiesListStatus,
    selectUserCity,
} from '../../store/user/selectors';

import './Search.sass';
import icons from '../../assets/images/icons.svg';
import { fetchCitiesList } from '../../store/user/actions';
import { StatusEnum } from '../../store/types';
import { LoaderApp } from '../LoaderApp';
import { setInitialForecast } from '../../store/forecastWeather/slice';
import { setInitialWeather } from '../../store/currentWeather/slice';

export const Search: React.FC = () => {
    const dispatch = useAPPDispatch();

    const currentCity: string = useSelector(selectUserCity) || '';

    const citiesList = useSelector(selectUserCitiesList);
    const getCitiesListStatus = useSelector(selectUserCitiesListStatus);

    const [localValue, setLocalValue] = React.useState(currentCity);

    const inputRef = React.useRef<HTMLInputElement>(null);

    // Memoize the debounced function
    const onSearch = React.useCallback(
        (str: string) => {
            if (str.length >= 2) {
                dispatch(fetchCitiesList(str));
            }
        },
        [dispatch]
    );

    const debouncedSave = React.useMemo(
        () => debounce(onSearch, 1200),
        [onSearch]
    );

    // Cleanup debounce on component unmount
    React.useEffect(() => {
        return () => {
            debouncedSave.cancel();
        };
    }, [debouncedSave]);

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLocalValue(value);
        if (!value.length) {
            dispatch(resetCitiesList());
        }
        debouncedSave(value);
    };

    const onClickClear = () => {
        dispatch(setInitialForecast());
        dispatch(setInitialWeather());
        dispatch(setInitialCity());
        setLocalValue('');
        inputRef.current?.focus();
        dispatch(resetCitiesList());
    };

    const onClickCity = (city: string) => {
        setLocalValue(city);
        dispatch(setUserCity(city));
        dispatch(resetCitiesList());
    };

    return (
        <section className="search">
            <div className="container search-content">
                <input
                    ref={inputRef}
                    name="search"
                    value={localValue}
                    className="search-input"
                    onChange={onChangeSearch}
                    placeholder="Search city"
                />
                {getCitiesListStatus === StatusEnum.LOADING ? (
                    <LoaderApp
                        isLoading={getCitiesListStatus === StatusEnum.LOADING}
                    />
                ) : (
                    <>
                        {localValue ? (
                            <svg
                                onClick={onClickClear}
                                className="search-icon search-clear"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                            </svg>
                        ) : (
                            <svg className="search-icon" width="20" height="20">
                                <use href={`${icons}#search`} />
                            </svg>
                        )}
                    </>
                )}
                {citiesList.length > 0 && (
                    <ul className="search-dropdown__list">
                        {citiesList.map(city => (
                            <li
                                key={city.place_id}
                                className="search-dropdown__item"
                                onClick={() => onClickCity(city.name)}
                            >
                                <p className="search-dropdown__city">
                                    {city.name}
                                </p>
                                <p className="search-dropdown__name">
                                    {city.display_name}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};
