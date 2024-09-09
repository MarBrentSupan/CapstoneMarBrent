import React, { useState } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";

function PasswordInput({ value, onChange, className, placeholder, autoComplete }) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="relative">
            <input
                type={passwordVisible ? "text" : "password"}
                value={value}
                onChange={onChange}
                className={`${className} border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm pr-10`} // Add padding to the right for the icon
                placeholder={placeholder}
                autoComplete={autoComplete}
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-3 text-gray-600"
            >
                {passwordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
        </div>
    );
}

export default PasswordInput;
