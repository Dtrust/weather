import React, { CSSProperties } from 'react';
import { ClipLoader } from 'react-spinners';

import './LoaderApp.sass';

interface ILoaderAppProps {
    isLoading: boolean;
    size?: number;
}

const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
};

export const LoaderApp: React.FC<ILoaderAppProps> = props => {
    const { isLoading, size = 25 } = props;

    return (
        <div className="loader-container">
            <ClipLoader
                color={'rgba(43, 62, 81, 1)'}
                loading={isLoading}
                cssOverride={override}
                size={size}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};
