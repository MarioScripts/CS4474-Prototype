import React from 'react';
import './Dropdown.scss';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.componentRef = React.createRef();

        this.state = {
            selectedValue: "",
            showOptions: false,
            selectedIndex: null,
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate(prevProps) {
        const { options } = this.props;
        const { options: prevOptions } = prevProps;

        if (!isEqual(options, prevOptions)) {
            this.setState({
                selectedValue: "",
                showOptions: false,
                selectedIndex: null,
            });
        }
    }

    handleToggleShowOptions = () => {
        const { showOptions } = this.state;
        this.setState({
            showOptions: !showOptions,
        });
    };

    handleClickOutside = (e) => {
        if (this.componentRef
            && this.componentRef.current
            && !this.componentRef.current.contains(e.target)
            && !this.componentRef.current.parentElement.contains(e.target)
        ) {
            this.setState({
                showOptions: false,
            });
        }
    };

    handleSelectValue = (index, value) => {
        const { options, onSelect, noSelect } = this.props;
        const { selectedIndex } = this.state;

        const isUnselect = index === selectedIndex;

        if(!noSelect) {
            this.setState({
                selectedValue: isUnselect ? "" : options[index],
                selectedIndex: isUnselect ? null : index,
            });
        } else {
            this.setState({
                showOptions: false,
            });
        }

        onSelect(index, value, isUnselect);
    };

    render() {
        const {
            children,
            width,
            height,
            options,
            noSelect,
            className,
        } = this.props;

        const {
            selectedValue,
            showOptions,
            selectedIndex,
        } = this.state;

        let contentRender;

        if (showOptions && options) {
            const optionsRender = [];

            options.forEach((o, index) => {
                const isActive = selectedIndex !== null && selectedIndex === index;
                optionsRender.push(
                    <div
                        className={`dropdown-content${isActive ? " dropdown-content-active" : ""}${noSelect ? " no-select-dropdown" : ""}`}
                        onClick={() => this.handleSelectValue(index, o)}
                    >
                        {o}
                    </div>
                );
            });

            contentRender = (
                <div
                    className="dropdown-content-container"
                    ref={this.componentRef}
                >
                    { optionsRender }
                </div>
            )
        }

        return (
            <div
                className={`dropdown-container${className ? ` ${className}` : ""}`}
                style={{  height: `${height}px` }}
            >
                <div
                    className="dropdown-main-button"
                    onClick={this.handleToggleShowOptions}
                    style={{  height: `${height}px`, width: `${width}px` }}
                >
                    { noSelect ? children : selectedValue || children }
                    <div className="arrow-bottom"/>
                </div>
                { contentRender }
            </div>
        );
    }
}

Dropdown.propTypes = {
    options: PropTypes.array.isRequired,
    children: PropTypes.object,
    height: PropTypes.number,
    noSelect: PropTypes.bool,
    onSelect: PropTypes.func,
};

Dropdown.defaultProps = {
    height: 35,
    noSelect: false,
    onSelect: () => {},
};

export default Dropdown;