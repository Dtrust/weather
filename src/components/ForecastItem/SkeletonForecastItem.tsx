import React from 'react';
import ContentLoader from 'react-content-loader';

export const SkeletonForecastItem: React.FC = props => {
    return (
        <ContentLoader
            className="forecast-item--skeleton"
            speed={2}
            width={140}
            height={150}
            viewBox="0 0 140 150"
            backgroundColor="#bdbdbd"
            foregroundColor="#c2e5f4"
            {...props}
        >
            <rect x="4" y="4" rx="0" ry="0" width="130" height="10" />
            <rect x="0" y="397" rx="30" ry="30" width="201" height="61" />
            <rect x="0" y="325" rx="0" ry="0" width="201" height="52" />
            <rect x="4" y="21" rx="0" ry="0" width="130" height="10" />
            <rect x="37" y="39" rx="100" ry="100" width="60" height="60" />
            <rect x="4" y="107" rx="0" ry="0" width="130" height="10" />
            <rect x="4" y="123" rx="0" ry="0" width="130" height="10" />
        </ContentLoader>
    );
};
