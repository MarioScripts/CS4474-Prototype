import React from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';
import Button from "../Button/Button";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

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
            disablePrimary,
            isLoading,
            isDelete,
        } = this.props;

        if (!isShowing) return null;

        let loadingRender;

        if (isLoading) {
            loadingRender = <LoadingSpinner size="5" width="1" className="edit-song-loading"/>;
        }

        return (
            <div id="modal-background">
                <div className="popup" style={{width, height}}>
                    <div className="modal-title">
                        {title}
                    </div>

                    {children}

                    <div className="modal-buttons-container">
                        <Button className="inverse-button" onClick={() => this.handleClick(false)} disabled={isLoading}>{cancelText}</Button>

                        <div className="primary-load-container">
                            { loadingRender }
                            <Button className={isDelete ? "delete-button" : "filled-button"} onClick={() => this.handleClick(true)} disabled={disablePrimary || isLoading}>{text}</Button>
                        </div>
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
    isLoading: PropTypes.bool,
    isDelete: PropTypes.bool,
};

Modal.defaultProps = {
    cancelText: "Cancel",
    text: "Continue",
    disablePrimary: false,
    isShowing: false,
    isLoading: false,
    isDelete: false,
};

export default Modal;