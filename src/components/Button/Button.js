import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

class Button extends React.Component {

    render() {
        const {
            width,
            height,
            style,
            className,
            children,
            onClick,
            fontSize,
            disabled
        } = this.props;

        return (
            <div
                className={(disabled ? 'button disabled-button' : `button`) + (className ? " " + className : '')}
                style={{width, height, fontSize, ...style}}
                onClick={disabled ? null : onClick}
            >
                {children}
            </div>
        );
    }
}

Button.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.array,
    onClick: PropTypes.func,
    fontSize: PropTypes.number,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    disabled: false,
};

export default Button;