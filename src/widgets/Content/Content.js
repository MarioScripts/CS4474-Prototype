import React from 'react';
import './Content.scss';
import PropTypes from 'prop-types';
import Button from "../../components/Button/Button";
import {playSvg} from "../../utils/iconUtils";
import SongList from "../../components/SongList/SongList";

class Content extends React.Component {
    render() {
        const {
            songs,
            isPlaylist,
            isPlaying,
            activeSongIndex,
            onPlayAll,
            onSongStateChange,
            onSongEdit,
            onSongDelete,
        } = this.props;
        const songLength = Object.keys(songs).length;

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
    onSongStateChange: PropTypes.func,
    onSongEdit: PropTypes.func,
    onSongDelete: PropTypes.func
};

Content.defaultProps = {
    isPlaylist: false,
    activeSongIndex: null,
    isPlaying: false,
    onSongStateChange: () => {},
    onSongEdit: () => {},
    onSongDelete: () => {},
};

export default Content;