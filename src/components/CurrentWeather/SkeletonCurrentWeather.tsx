import React from 'react';
import ContentLoader from 'react-content-loader';

export const SkeletonCurrentWeather: React.FC = props => {
    return (
        <ContentLoader
            className="current--skeleton"
            speed={2}
            width={800}
            height={270}
            viewBox="0 0 800 270"
            backgroundColor="#bdbdbd"
            foregroundColor="#c2e5f4"
            {...props}
        >
            <rect x="28" y="115" rx="100" ry="100" width="150" height="150" />
            <rect x="4" y="4" rx="5" ry="5" width="200" height="40" />
            <rect x="4" y="58" rx="5" ry="5" width="200" height="40" />
            <rect x="460" y="104" rx="5" ry="5" width="250" height="30" />
            <rect x="460" y="158" rx="5" ry="5" width="250" height="20" />
            <rect x="460" y="198" rx="5" ry="5" width="250" height="20" />
            <rect x="460" y="237" rx="5" ry="5" width="250" height="20" />
        </ContentLoader>
    );
};
