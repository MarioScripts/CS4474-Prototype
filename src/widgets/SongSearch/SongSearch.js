import React from 'react';
import './SongSearch.scss';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import SearchInput from "../../components/SearchInput/SearchInput";
import {includesIgnoreCase} from "../../utils/songUtils";

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
        const { songs } = this.props;
        const { songs: prevSongs } = prevProps;

        if (!isEqual(songs, prevSongs)) {
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
            height,
            songs,
            className,
        } = this.props;

        const {
            showOptions,
            searchText,
        } = this.state;

        let contentRender;
        const optionsRender = [];
        if (showOptions && songs) {

            Object.entries(songs).forEach(([songPath, song], index) => {
                if (
                    (song.name && includesIgnoreCase(song.name, searchText))
                    || (song.album && includesIgnoreCase(song.name, searchText))
                    || (song.genre && includesIgnoreCase(song.genre, searchText))
                    || (song.artist && includesIgnoreCase(song.artist, searchText))
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
                <SearchInput
                    ref={this.inputRef}
                    hintText="Search songs"
                    onChange={this.handleSearch}
                    onClick={this.showSearchOptions}
                />
                { optionsRender.length ? contentRender : "" }
            </div>
        );
    }
}

SongSearch.propTypes = {
    songs: PropTypes.array.isRequired,
    height: PropTypes.number,
    onSearch: PropTypes.func,
};

SongSearch.defaultProps = {
    height: 35,
    onSearch: () => {},
};

export default SongSearch;