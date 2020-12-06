import React from 'react';
import './Content.scss';
import PropTypes from 'prop-types';
import Button from "../../components/Button/Button";
import {deleteSvg, playSvg} from "../../utils/iconUtils";
import SongList from "../../components/SongList/SongList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMusic, faClone, faEdit } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../components/Dropdown/Dropdown";
import SearchInput from "../../components/SearchInput/SearchInput";
import SongSearch from "../SongSearch/SongSearch";

class Content extends React.Component {
    handleButtonClick = (index) => {
        const { isPlaylist, onAddSong } = this.props;
        onAddSong(isPlaylist, index);
    };

    handleSearch = (i, path) => {
        const element = document.getElementById(path);
        element.classList.add("search-result");
        element.scrollIntoView(false);

        setTimeout(() => {
            element.classList.remove("search-result");

            setTimeout(() => {
                element.classList.add("search-result");

                setTimeout(() => {
                    element.classList.remove("search-result");
                }, 500);

            }, 300);

        }, 300);
    };

    render() {
        const {
            songs,
            isPlaylist,
            isPlaying,
            disableAddSong,
            activeSongIndex,
            onPlayAll,
            onSongStateChange,
            onSongEdit,
            onSongDelete,
            onPlaylistCopy,
            onPlaylistDelete,
            onPlaylistEdit,
        } = this.props;
        const songLength = Object.keys(songs).length;

        let addButtonRender;

        if(isPlaylist) {
            addButtonRender = (
                <Button className="inverse-button addsong-button" onClick={this.handleButtonClick} width={8} disabled={disableAddSong}>
                    <div className="add-song-text">
                        +
                    </div>
                    <FontAwesomeIcon icon={faMusic}/>
                </Button>
            );
        } else {
            addButtonRender = (
                <Dropdown className="addsong-button" options={["Add Files", "Add Folder"]} noSelect height={33} onSelect={this.handleButtonClick}>
                    <div className="add-song-text">
                        +
                    </div>
                    <FontAwesomeIcon icon={faMusic}/>
                </Dropdown>
            )
        }

        return (
            <div className="content">
                <div className="content-info-container">
                    <div className="top-row">
                        <div className="song-number">
                            { songLength } Song{ songLength > 1 || songLength === 0 ? "s" : ""}
                        </div>
                        <Button className="filled-button playall-button" onClick={onPlayAll}>
                            <div className="playall-icon">
                                { playSvg() }
                            </div>
                            Play All
                        </Button>

                        {addButtonRender}
                        
                        <Button className="inverse-button copyplaylist-button" style={{display : isPlaylist ? 'flex' : 'none'}} width={13} onClick={onPlaylistCopy}>
                            <FontAwesomeIcon icon={faClone}/>
                            <div className="copy-playlist-text">
                                Copy
                            </div>
                        </Button>

                        <Button className="inverse-button editplaylist-button" style={{display : isPlaylist ? 'flex' : 'none'}} width={13} onClick={onPlaylistEdit}>
                            <FontAwesomeIcon icon={faEdit}/>
                            <div className="edit-playlist-text">
                                Edit
                            </div>
                        </Button>

                        <Button className="inverse-delete-button deleteplaylist-button" style={{display : isPlaylist ? 'flex' : 'none'}} onClick={onPlaylistDelete}>
                            <div className="delete-playlist-icon">
                                { deleteSvg() }
                            </div>
                        </Button>
                    </div>

                    <div className="bottom-row">
                        <SongSearch
                            className="song-search-content"
                            songs={songs}
                            onSearch={this.handleSearch}
                        />
                    </div>
                </div>
                <div className="song-list-separator"/>

                <SongList
                    songs={songs}
                    isPlaylist={isPlaylist}
                    activeSongIndex={activeSongIndex}
                    isPlaying={isPlaying}
                    onSongDelete={onSongDelete}
                    onSongEdit={onSongEdit}
                    onSongStateChange={onSongStateChange}
                />
            </div>
        );
    }
}

Content.propTypes = {
    songs: PropTypes.object.isRequired,
    onPlayAll: PropTypes.func.isRequired,
    isPlaylist: PropTypes.bool,
    activeSongIndex: PropTypes.number,
    isPlaying: PropTypes.bool,
    disableAddSong: PropTypes.bool,
    onSongStateChange: PropTypes.func,
    onSongEdit: PropTypes.func,
    onSongDelete: PropTypes.func,
    onAddSong: PropTypes.func,
    onPlaylistEdit : PropTypes.func,
    onPlaylistCopy : PropTypes.func,
    onPlaylistDelete : PropTypes.func,
};

Content.defaultProps = {
    isPlaylist: false,
    activeSongIndex: null,
    isPlaying: false,
    disableAddSong: false,
    onSongStateChange: () => {},
    onSongEdit: () => {},
    onSongDelete: () => {},
    onAddSong: () => {},
    onPlaylistEdit: ()=> {},
    onPlaylistCopy: ()=> {},
    onPlaylistDelete: ()=> {},
};

export default Content;