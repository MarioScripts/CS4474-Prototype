import React from 'react';
import './Button.scss';

class Button extends React.Component {

    render() {
        const {width, height, style, className, children, onClick, fontSize, disabled} = this.props;
        return (
            <div
                className={disabled ? 'button disabled-button' : `button${className ? " " + className : ''}`}
                style={{width, height, fontSize, ...style}}
                onClick={disabled ? null : onClick}
            >
                {children}
            </div>
        );
    }
}

export default Button;