import React from 'react';
import './TextInput.scss';
import PropTypes from 'prop-types';

class TextInput extends React.Component {

    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    componentDidMount() {
        const { autoFocus } = this.props;
        if (autoFocus) {
            this.input.current.focus()
        }
    }

    handleTextChange = (e) => {
        const { onChange } = this.props;
        onChange(this.input.current.value);
    };

    render() {
        const {
            width,
            showError,
            defValue,
        } = this.props;

        return (
            <input
                onKeyUp={this.handleTextChange}
                className={`text-input${showError ? " error-text-input" : ""}`}
                style={{width: `${width}px`}}
                type="text"
                ref={this.input}
                defaultValue={defValue}
            />
        );
    }
}

TextInput.propTypes = {

};

TextInput.defaultProps = {

};

export default TextInput;