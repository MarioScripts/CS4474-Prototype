import React from 'react';
import './MenuItem.css';

class MenuItem extends React.Component {
    render() {
        const { children, active, fontSize, onClick } = this.props;
        return (
            <div className={`menu-item-container${active ? " active" : ""}`} style={{ fontSize }} onClick={onClick}>
                {children}
            </div>
        );
    }
}

export default MenuItem;