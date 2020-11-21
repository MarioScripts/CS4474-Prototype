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
            defaultValue
        } = this.props;

        return (
            <input
                defaultValue={defaultValue}
                onKeyUp={this.handleTextChange}
                className={`text-input${showError ? " error-text-input" : ""}`}
                style={{width: `${width}px`}}
                type="text"
                ref={this.input}
            />
        );
    }
}

TextInput.propTypes = {
    showError: PropTypes.bool,
    width: PropTypes.number,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,

};

TextInput.defaultProps = {
    showError: false,
    defaultValue: "",
    onChange: () => {},
};

export default TextInput;