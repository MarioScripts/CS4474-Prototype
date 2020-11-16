import React from 'react';
import './Content.scss';
import PropTypes from 'prop-types';
import Button from "../../components/Button/Button";
import {playSvg} from "../../utils/iconUtils";
import SongList from "../../components/SongList/SongList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../components/Dropdown/Dropdown";

class Content extends React.Component {
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
            onAddSong,
        } = this.props;
        const songLength = Object.keys(songs).length;

        let addButtonRender;

        if(isPlaylist) {
            addButtonRender = (
                <Button className="inverse-button addsong-button" onClick={() => onAddSong(isPlaylist)} width={8} disabled={disableAddSong}>
                    <div className="add-song-text">
                        +
                    </div>
                    <FontAwesomeIcon icon={faMusic}/>
                </Button>
            );
        } else {
            addButtonRender = (
                <Dropdown className="addsong-button" options={["Add Files", "Add Folder"]} noSelect height={33}>
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

                    </div>
                    <div className="bottom-row">

                    </div>
                </div>
                <div className="song-list-separator"/>

                <SongList
                    songs={songs}
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
};

export default Content;