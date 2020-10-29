import React from 'react';
import PropTypes from 'prop-types';
import './MenuItem.scss';

class MenuItem extends React.Component {
    render() {
        const {
            children,
            active,
            fontSize,
            onClick
        } = this.props;

        return (
            <div className={`menu-item-container${active ? " active" : ""}`} style={{ fontSize }} onClick={onClick}>
                {children}
            </div>
        );
    }
}

MenuItem.propTypes = {
    children: PropTypes.array,
    active: PropTypes.bool,
    fontSize: PropTypes.number,
    onClick: PropTypes.func,
};

export default MenuItem;