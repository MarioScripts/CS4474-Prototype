import React from 'react';
import './SongSearch.scss';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import SearchInput from "../../components/SearchInput/SearchInput";

class SongSearch extends React.Component {
    constructor(props) {
        super(props);
        this.componentRef = React.createRef();
        this.inputRef = React.createRef();

        this.state = {
            selectedValue: "",
            showOptions: false,
            selectedIndex: null,
            searchText: "",
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
                searchText: "",
            });
        }
    }

    handleSearch = (text) => {
        this.setState({
            showOptions: !!text,
            searchText: text,
        });
    };

    showSearchOptions = () => {
        const { searchText } = this.state;
        this.setState({
            showOptions: !!searchText,
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
        const { onSearch } = this.props;
        const { selectedIndex } = this.state;

        const isUnselect = index === selectedIndex;

        this.setState({
            showOptions: false,
            searchText: "",
        });

        this.inputRef.current.clearText();
        onSearch(index, value, isUnselect);
    };

    render() {
        const {
            children,
            width,
            height,
            options,
            className,
        } = this.props;

        const {
            showOptions,
            searchText,
        } = this.state;

        let contentRender;
        const optionsRender = [];
        if (showOptions && options) {

            Object.entries(options).forEach(([songPath, song], index) => {
                if (
                    (song.name && song.name.toLowerCase().includes(searchText))
                    || (song.album && song.album.toLowerCase().includes(searchText))
                    || (song.genre && song.genre.toLowerCase().includes(searchText))
                    || (song.artist && song.artist.toLowerCase().includes(searchText))
                ) {
                    optionsRender.push(
                        <div
                            className={"dropdown-content no-select-dropdown"}
                            onClick={() => this.handleSelectValue(index, songPath)}
                        >
                            {song.name} {song.artist ? `- ${song.artist}` : ""}
                        </div>
                    );
                }

            });


            contentRender = (
                <div
                    className={`dropdown-content-container${className ? ` ${className}` : ""}`}
                    ref={this.componentRef}
                >
                    { optionsRender }
                </div>
            );
        }


        return (
            <div
                className={"dropdown-container"}
                style={{  height: `${height}px` }}
            >
                <SearchInput ref={this.inputRef} hintText="Search songs" onChange={this.handleSearch} onClick={this.showSearchOptions}/>
                { optionsRender.length ? contentRender : "" }
            </div>
        );
    }
}

SongSearch.propTypes = {
    options: PropTypes.array.isRequired,
    children: PropTypes.object,
    height: PropTypes.number,
    noSelect: PropTypes.bool,
    onSearch: PropTypes.func,
};

SongSearch.defaultProps = {
    height: 35,
    noSelect: false,
    onSearch: () => {},
};

export default SongSearch;