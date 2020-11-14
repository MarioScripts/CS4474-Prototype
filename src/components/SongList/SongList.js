import React from 'react';
import './SongList.scss';
import PropTypes from 'prop-types';
import Button from "../Button/Button";
import {deleteSvg, editSvg, pauseSvg, playSvg} from "../../utils/iconUtils";
import {PAUSED, PLAYING} from "../../utils/songUtils";

class SongList extends React.Component {

    render() {
        const {
            songs,
            activeSongIndex,
            isPlaying,
            onSongStateChange,
            onSongEdit,
            onSongDelete,
        } = this.props;

        const songRows = [];
        Object.values(songs).forEach((song, index) => {
            const isActive = activeSongIndex !== null && activeSongIndex === index;
            const showPauseIcon = isPlaying && isActive;
            const playPauseOnClick = () => onSongStateChange(index, showPauseIcon ? PAUSED : PLAYING);

            songRows.push(
                <tr className={isActive ? "song-active-row" : ""} onDoubleClick={playPauseOnClick}>
                    <td>{ song.name }</td>
                    <td>{ song.artist || "--" }</td>
                    <td>{ song.genre || "--" }</td>
                    <td>{ song.duration }</td>
                    <td className="song-actions-col">
                        <div className="actions-container">
                            <div className={`${showPauseIcon ? "pause" : "play"}-icon${isActive ?  ` ${showPauseIcon ? "pause" : "play"}-icon-active` : ""}`}>
                                { showPauseIcon ? pauseSvg(playPauseOnClick) : playSvg(playPauseOnClick) }
                            </div>
                            <div className={`edit-icon${isActive ? " edit-icon-active" : ""}`}>
                                { editSvg(() => onSongEdit(index)) }
                            </div>
                            <div className={`delete-icon${isActive ? " delete-icon-active" : ""}`}>
                                { deleteSvg(() => onSongDelete(index)) }
                            </div>
                        </div>

                    </td>
                </tr>
            )
        });

        return (
            <div className="songs-container">
                <table id="songs-table">
                    <tr>
                        <th className="song-reg-header">Name</th>
                        <th className="song-reg-header">Artist</th>
                        <th className="song-reg-header">Genre</th>
                        <th className="song-reg-header">Length</th>
                        <th className="song-actions-col">Actions</th>
                    </tr>
                    { songRows }
                </table>
            </div>
        );
    }
}

SongList.propTypes = {
    songs: PropTypes.object.isRequired,
    activeSongIndex: PropTypes.number,
    isPlaying: PropTypes.bool,
    onSongStateChange: PropTypes.func,
    onSongEdit: PropTypes.func,
    onSongDelete: PropTypes.func,
};

SongList.defaultProps = {
    activeSongIndex: null,
    isPlaying: false,
};

export default SongList;