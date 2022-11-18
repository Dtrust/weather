import React from 'react';

import './Error.sass';


type ErrorProps = {
    message: string,
}

export const ErrorBlock: React.FC<ErrorProps> = (props) => {
    
    const { message } = props
    
    return (
        <div className="error">
            <p className="error-msg">
                {message}
            </p>
        </div>
    );
}
