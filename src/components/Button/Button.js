import React from 'react';
import './Button.css';

class Button extends React.Component {

    render() {
        const {width, height, style, className, children, onClick} = this.props;

        return (
            <div className={`button${className ? " " + className : ''}`} style={{width, height, ...style}} onClick={onClick}>
                {children}
            </div>
        );
    }
}

export default Button;