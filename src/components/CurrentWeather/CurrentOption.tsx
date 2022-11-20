import React from 'react';

import icons from '../../assets/images/icons.svg';

type CurrentOptionProps = {
    currentData: React.ReactNode;
    optionTxt: string;
    optionMarker: string;
    optionIcon: string;
};

const CurrentOption: React.FC<CurrentOptionProps> = props => {
    const { currentData, optionTxt, optionMarker, optionIcon } = props;

    return (
        <div className="current-weather__option option">
            <svg className="option-icon" width="20" height="20">
                <use href={`${icons}#${optionIcon}`} />
            </svg>
            <p className="option-txt">
                <span className="txt">{optionTxt}</span>
                <span className="count">{currentData}</span>
                <span className="marker">{optionMarker}</span>
            </p>
        </div>
    );
};

export default CurrentOption;
