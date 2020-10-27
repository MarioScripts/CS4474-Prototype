import React from 'react';
import './Modal.css';
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
            isShowing
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
                        <Button className="filled-button" onClick={() => this.handleClick(true)}>{text}</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;