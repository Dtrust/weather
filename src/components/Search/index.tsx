import React from 'react';
import debounce from 'lodash.debounce';

import { useAPPDispatch } from '../../store/store';
import { setUserCity } from '../../store/user/slice';
import { useSelector } from 'react-redux';
import { selectUserCity } from '../../store/user/selectors';

import './Search.sass';
import icons from '../../assets/images/icons.svg';

export const Search: React.FC = () => {
    const dispatch = useAPPDispatch();

    const currentCity: string = useSelector(selectUserCity) || '';

    const [localValue, setLocalValue] = React.useState(currentCity);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            dispatch(setUserCity(str));
        }, 1000),
        [dispatch]
    );

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateSearchValue(event.target.value);
        setLocalValue(event.target.value);
    };

    const onClickClear = () => {
        dispatch(setUserCity(currentCity));
        setLocalValue('');
        inputRef.current?.focus();
    };

    return (
        <section className="search">
            <div className="container search-content">
                <input
                    ref={inputRef}
                    value={localValue}
                    className="search-input"
                    onChange={onChangeSearch}
                    placeholder="Search city"
                />
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
            </div>
        </section>
    );
};
