import React from 'react';
import logo from '../../assets/main-logo.png';

export default function ApplicationLogo({ className, ...props }) {
    return (
        <img 
            src={logo} 
            alt="Logo" 
            className={className} // Pass the className down to the img tag
            {...props} 
        />
    );
}
