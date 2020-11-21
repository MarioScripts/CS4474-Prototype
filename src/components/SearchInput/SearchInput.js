import React from 'react';
import './SearchInput.scss';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons"

class SearchInput extends React.Component {

    constructor(props) {
        super(props);
        this.input = React.createRef();

        this.state = {
            searchText: "",
        };
    }

    componentDidMount() {
        const { autoFocus } = this.props;
        if (autoFocus) {
            this.input.current.focus()
        }
    }

    clearText = () => {
        this.setState({
            searchText: "",
        });

        this.input.current.value = "";
    };

    handleTextChange = (e) => {
        const { onChange } = this.props;
        let text = "";

        if(e) {
            text = this.input.current.value;
        } else {
            this.input.current.value = "";
            this.input.current.focus();
        }

        this.setState({
            searchText: text
        });
        onChange(text);
    };

    render() {
        const {
            width,
            hintText,
            onClick,
            className,
        } = this.props;

        const { searchText } = this.state;

        return (
            <div className={`search-input-container${className ? ` ${className}` : ""}`}>
                <FontAwesomeIcon icon={faSearch} className="search-input-search-icon"/>
                <input
                    placeholder={hintText}
                    onKeyUp={this.handleTextChange}
                    onClick={onClick}
                    className={`search-input`}
                    style={{width: `${width}px`}}
                    type="text"
                    ref={this.input}
                />
                <div className="search-input-cancel-container">
                    <FontAwesomeIcon
                        className="search-input-cancel-icon"
                        style={{ display: searchText.length ? "block" : "none" }}
                        onClick={() => this.handleTextChange()}
                        icon={faTimes}
                    />
                </div>

            </div>

        );
    }
}

SearchInput.propTypes = {
    width: PropTypes.string,
    hintText: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
};

SearchInput.defaultProps = {
    hintText: "",
    width: 150,
    onChange: () => {},
    onClick: () => {},
};

export default SearchInput;