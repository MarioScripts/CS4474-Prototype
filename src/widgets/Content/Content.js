import React from 'react';
import './Content.scss';
import PropTypes from 'prop-types';
import Button from "../../components/Button/Button";
import {playSvg} from "../../utils/iconUtils";

class Content extends React.Component {
    render() {
        const {
            songList,
            isPlaylist,
            activeSongIndex,
            onPlayAll,
        } = this.props;
        const songLength = Object.keys(songList).length;

        const songRenders = [];
        Object.values(songList).forEach((song, index) => {
            songRenders.push(
                <div id={song.name}>
                    { song.name } ___ { song.album || "--"} ___ { song.artist } ___ { song.genre } ___ { song.duration } ___ { index === activeSongIndex ? " - PLAYING" : ""}
                </div>
            );
        });

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
                { songRenders }
            </div>
        );
    }
}
//
// Modal.propTypes = {
//
// };
//
// Modal.defaultProps = {
//
// };

export default Content;