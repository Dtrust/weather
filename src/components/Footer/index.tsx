import React from 'react';

import './Footer.sass';

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <p className="footer-copyright">
                    Developed By
                    <a
                        className="link footer-copyright__link"
                        href="http://dovziy.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Dennis Dovziy
                    </a>
                </p>
            </div>
        </footer>
    );
};
