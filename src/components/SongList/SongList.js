import React from 'react';
import './SongList.scss';
import PropTypes from 'prop-types';
import {deleteSvg, editSvg, pauseSvg, playSvg} from "../../utils/iconUtils";
import {PAUSED, PLAYING} from "../../utils/songUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

class SongList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: new Set(),
        };
    }

    handleSelection = (e, songPath) => {
        const { selected } = this.state;
        const { onSelectedChange } = this.props;

        // Only detect as selection if the row is clicked, not the play/edit/delete action
        if(e.target.localName === "td" || e.target.localName === "tr") {
            const isUnselected = selected.has(songPath);

            if (isUnselected) {
                selected.delete(songPath)
            } else {
                selected.add(songPath);
            }

            this.setState({
                selected,
            });

            if(onSelectedChange) {
                onSelectedChange([...selected]);
            }
        }
    };

    render() {
        const {
            songs,
            activeSongIndex,
            isPlaying,
            onSongStateChange,
            onSongEdit,
            onSongDelete,
            selectedRowCss,
            showActive,
            showActions,
            className,
            isPlaylist,
        } = this.props;

        const { selected } = this.state;

        const songRows = [];
        Object.entries(songs).forEach(([songPath, song], index) => {
            const isActive = activeSongIndex !== null && activeSongIndex === index && showActive;
            const isSelected = selected.has(songPath);
            const showPauseIcon = isPlaying && isActive;
            const playPauseOnClick = () => onSongStateChange(index, showPauseIcon ? PAUSED : PLAYING);

            let actionsRender;
            if (showActions) {
                let deleteIconRender = deleteSvg(() => onSongDelete({path: songPath, index}));
                if (isPlaylist) {
                    deleteIconRender = <FontAwesomeIcon icon={faTimes} onClick={() => onSongDelete({path: songPath, index})}/>
                }
                actionsRender = (
                    <td className="song-actions-col">
                        <div className="actions-container">
                            <div className={`${showPauseIcon ? "pause" : "play"}-icon${isActive ?  ` ${showPauseIcon ? "pause" : "play"}-icon-active` : ""}`}>
                                { showPauseIcon ? pauseSvg(playPauseOnClick) : playSvg(playPauseOnClick) }
                            </div>
                            <div className={`edit-icon${isActive ? " edit-icon-active" : ""}`}>
                                { editSvg(() => onSongEdit(index)) }
                            </div>
                            <div className={`delete-icon${isActive ? " delete-icon-active" : ""}`}>
                                { deleteIconRender }
                            </div>
                        </div>

                    </td>
                );
            }

            songRows.push(
                <tr
                    className={(isActive ? "song-active-row" : "") + (isSelected ? ` ${selectedRowCss}` : "")}
                    onClick={(e) => this.handleSelection(e, songPath)}
                    onDoubleClick={playPauseOnClick}
                    id={songPath}
                >
                    <td>{ song.name }</td>
                    <td>{ song.artist || "--" }</td>
                    <td>{ song.genre || "--" }</td>
                    <td>{ song.duration }</td>
                    { actionsRender }
                </tr>
            );
        });

        return (
            <div className={`songs-container${className ? ` ${className}` : ""}`}>
                <table id="songs-table">
                    <thead>
                        <tr>
                            <th className="song-reg-header">Name</th>
                            <th className="song-reg-header">Artist</th>
                            <th className="song-reg-header">Genre</th>
                            <th className="song-reg-header">Length</th>
                            { showActions && <th className="song-actions-col">Actions</th> }
                        </tr>
                    </thead>

                    <tbody>
                        { songRows }
                    </tbody>
                </table>
            </div>
        );
    }
}

SongList.propTypes = {
    songs: PropTypes.object.isRequired,
    isPlaylist: PropTypes.bool,
    activeSongIndex: PropTypes.number,
    isPlaying: PropTypes.bool,
    onSongStateChange: PropTypes.func,
    onSongEdit: PropTypes.func,
    onSongDelete: PropTypes.func,
    onSelectedChange: PropTypes.func,
    selectedRowCss: PropTypes.string,
    showActive: PropTypes.bool,
    showActions: PropTypes.bool,
    className: PropTypes.string,
};

SongList.defaultProps = {
    activeSongIndex: null,
    isPlaying: false,
    isPlaylist: false,
    showActive: true,
    showActions: true,
    selectedRowCss: "selected-row"
};

export default SongList;