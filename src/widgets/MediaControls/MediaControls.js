import React from 'react';
import './MediaControls.scss';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/lazy';
import { formatTime } from "../../utils/songUtils";
import {pauseSvg, playSvg, prevButton, skipButton, volumeMuteSvg, volumeSvg} from "../../utils/iconUtils";

const PLAYING = true;
const PAUSED = false;
class MediaControls extends React.Component {
    constructor(props) {
        super(props);
        this.player = null;

        this.state = {
            songState: PAUSED,
            songDuration: 0,
            songProgress: 0,
            songVolume: 50,
            songMuted: false,
            seekingInProgress: false,
        };
    }

    playAll = () => {
        this.setState({
            songState: PLAYING,
            songProgress: 0,
        });
        this.player.seekTo(0);
    };

    handleSongStateToggle = (newState) => {
        this.setState({
            songState: newState,
        });
    };

    handleSongProgress = (progress) => {
        const { seekingInProgress } = this.state;
        if(!seekingInProgress) {
            this.setState({
                songProgress: progress.playedSeconds,
            });
        }
    };

    handleSongDuration = (duration) => {
        this.setState({
            songDuration: Math.trunc(duration),
        });
    };

    handleSeekStart = () => {
        this.setState({
            seekingInProgress: true,
        });
    };

    handleSeekEnd = () => {
        this.setState({
            seekingInProgress: false,
        });
    };

    handleSongEnd = () => {
        const { songs, onIndexChange, songIndex } = this.props;
        const songLength = Object.keys(songs).length;

        if (songIndex >= songLength - 1) {
            this.setState({
                songState: PAUSED,
            });
        } else {
            onIndexChange((songIndex + 1) % songLength);
        }
    };

    handleSeekChange = (e) => {
        const seekValue = parseInt(e.target.value);
        this.player.seekTo(seekValue);
        this.setState({
            songProgress: seekValue,
        });
    };

    handleVolumeChange = (e) => {
        const volumeValue = parseInt(e.target.value);
        this.setState({
            songVolume: volumeValue,
            songMuted: false,
        });
    };

    handleMuteToggle = () => {
        const { songMuted } = this.state;
        this.setState({
            songMuted: !songMuted,
        });
    };

    handleSkips = (next) => {
        const { songs, onIndexChange, songIndex } = this.props;

        let newIndex = songIndex;
        let needsUpdate = true;
        if(next) {
            newIndex = (newIndex + 1) % Object.keys(songs).length;
        } else {
            newIndex = newIndex - 1;
            if (newIndex < 0 && songIndex !== 0) {
                newIndex = 0;
            } else if (newIndex < 0 && songIndex === 0) {
                needsUpdate = false;
                this.player.seekTo(0);
            }
        }

        if (needsUpdate) {
            onIndexChange(newIndex);
        }

    };

    ref = (player) => {
        this.player = player;
    };

    render() {
        const {
            songs,
            songIndex,
        } = this.props;

        const { songState, songProgress, songDuration, seekingInProgress, songVolume, songMuted } = this.state;
        let playPauseRender;
        let volumeRender;

        if(songState === PLAYING) {
            playPauseRender = (
                <div id="pause-button" className="media-icon">
                    { pauseSvg(() => this.handleSongStateToggle(PAUSED)) }
                </div>

            );
        } else {
            playPauseRender = (
                <div id="play-button" className="media-icon">
                    { playSvg(() => this.handleSongStateToggle(PLAYING)) }
                </div>
            );
        }

        if(songMuted || songVolume === 0) {
            volumeRender = (
                <div id="volume-button" className="media-icon">
                    { volumeMuteSvg(this.handleMuteToggle) }
                </div>
            )
        } else {
            volumeRender = (
                <div id="volume-button" className="media-icon">
                    { volumeSvg(this.handleMuteToggle) }
                </div>
            );
        }

        return (
            <div className="media-container">
                <div className="currently-playing-container">
                    Currently playing placeholder
                </div>

                <div className="media-controls-container">
                    <div className="media-buttons-container">
                        <div className="skip-button media-icon">
                            { skipButton(() => this.handleSkips(false)) }
                        </div>

                        { playPauseRender }

                        <div className="skip-button media-icon">
                            { prevButton(() => this.handleSkips(true)) }
                        </div>
                    </div>

                    <div className="slide-container">
                        {formatTime(songProgress)}
                        <input
                            type="range"
                            min={0}
                            max={songDuration}
                            step="0.1"
                            value={songProgress}
                            className="slider"
                            onMouseDown={this.handleSeekStart}
                            onMouseUp={this.handleSeekEnd}
                            onChange={this.handleSeekChange}
                        />
                        {formatTime(songDuration)}
                    </div>
                </div>

                <div className="volume-container">
                    { volumeRender }
                    <div className="volume-slide-container">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            step="0.1"
                            value={songMuted ? 0 : songVolume}
                            className="slider"
                            onChange={this.handleVolumeChange}
                        />
                    </div>
                </div>

                <ReactPlayer
                    ref={this.ref}
                    onProgress={this.handleSongProgress}
                    onDuration={this.handleSongDuration}
                    onEnded={this.handleSongEnd}
                    className="player-container"
                    playing={songState && !seekingInProgress}
                    progressInterval={100}
                    volume={songVolume / 100}
                    muted={songMuted}
                    url={Object.keys(songs)[songIndex]}
                />
            </div>
        );
    }
}

MediaControls.propTypes = {
    songs: PropTypes.array.isRequired,
    onIndexChange: PropTypes.func.isRequired,
    songIndex: PropTypes.number.isRequired,
};

export default MediaControls;