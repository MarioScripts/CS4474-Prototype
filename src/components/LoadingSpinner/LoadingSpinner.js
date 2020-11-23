import React from 'react';
import PropTypes from 'prop-types';

import "./LoadingSpinner.scss";

const LoadingSpinner = ({ size, width, className }) => {
    return <div className={`spinner${className ? ` ${className}` : ""}`} style={{ width: size, height: size, borderWidth: width }} />;
};

LoadingSpinner.propTypes = {
    size: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default LoadingSpinner;
