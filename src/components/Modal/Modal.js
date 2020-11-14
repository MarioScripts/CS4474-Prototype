import React from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';
import Button from "../Button/Button";

class Modal extends React.Component {

    handleClick = (click) => {
        const { onClose } = this.props;

        onClose(click);
    };

    render() {
        const {
            width,
            height,
            children,
            title,
            cancelText,
            text,
            isShowing,
            disablePrimary
        } = this.props;

        if (!isShowing) return null;

        return (
            <div id="modal-background">
                <div className="popup" style={{width, height}}>
                    <div className="modal-title">
                        {title}
                    </div>

                    {children}

                    <div className="modal-buttons-container">
                        <Button className="inverse-button" onClick={() => this.handleClick(false)}>{cancelText}</Button>
                        <Button className="filled-button" onClick={() => this.handleClick(true)} disabled={disablePrimary}>{text}</Button>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.array,
    cancelText: PropTypes.string,
    text: PropTypes.string,
    isShowing: PropTypes.bool,
    disablePrimary: PropTypes.bool,
    onClose: PropTypes.func,
};

Modal.defaultProps = {
    cancelText: "Cancel",
    text: "Continue",
    disablePrimary: false,
    isShowing: false,
};

export default Modal;