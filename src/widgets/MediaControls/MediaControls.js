import React from 'react';
import './MediaControls.scss';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/lazy';
import {formatTime, PAUSED, PLAYING, STOPPED} from "../../utils/songUtils";
import {pauseSvg, playSvg, prevButton, skipButton, volumeMuteSvg, volumeSvg} from "../../utils/iconUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
const settings = window.require("electron-settings");

class MediaControls extends React.Component {
    constructor(props) {
        super(props);
        this.player = null;

        this.state = {
            songDuration: 0,
            songProgress: 0,
            songVolume: 50,
            songMuted: false,
            seekingInProgress: false,
            shuffleMode : false,
            shuffleList : [],
        };
    }

    componentDidMount() {
        this.setState({
            songVolume: settings.getSync("volume"),
            songMuted: settings.getSync("muted"),
        });
    }

    resetSong = (hard) => {
        const { songDuration } = this.state;
        this.setState({
            songProgress: 0,
            songDuration: hard ? 0 : songDuration,
        });

        if (this.player) {
            this.player.seekTo(0);
        }
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
        const { songs, onIndexChange, songIndex, onSongStateChange } = this.props;
        const {shuffleMode, shuffleList} = this.state;

        const songLength = Object.keys(songs).length;

        let shuffleSongs = shuffleList;
        if (shuffleMode){
            if (shuffleSongs.length >= songLength - 1){
                this.handleShuffleState();
                onSongStateChange(PAUSED);
            }else{
                shuffleSongs.push(songIndex);

                let nxtIndex = this.getRandomIndex(songLength);
                while(shuffleSongs.includes(nxtIndex)){
                    nxtIndex = this.getRandomIndex(songLength);
                }

                this.setShuffleList(shuffleSongs);
                onIndexChange(nxtIndex);
            }

        }else{
            if (songIndex >= songLength - 1) {
                onSongStateChange(PAUSED);
            } else {
                onIndexChange((songIndex + 1) % songLength);
            }
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
        settings.setSync("volume", volumeValue);
        settings.setSync("muted", false);

        this.setState({
            songVolume: volumeValue,
            songMuted: false,
        });
    };

    handleMuteToggle = () => {
        const { songMuted } = this.state;
        settings.setSync("muted", !songMuted);

        this.setState({
            songMuted: !songMuted,
        });
    };

    handleShuffleState = () => {
        const {shuffleMode} = this.state;
        this.setState({
            shuffleMode : !shuffleMode,
            shuffleList : [],
        });
    };

    setShuffleList = (list=[]) => {
        this.setState({
            shuffleList : list,
        });
    };

    getRandomIndex = (max) => {
        return Math.floor(Math.random() * max);
    };

    handleSkips = (next) => {
        const { songs, onIndexChange, onSongStateChange, songIndex } = this.props;
        const {shuffleMode, shuffleList} = this.state;

        let newIndex = songIndex;
        let needsUpdate = true;

        let shuffleSongs = shuffleList;
        const numSongs = Object.keys(songs).length;
        if(next) {
            if (shuffleMode){
                
                if (shuffleSongs.length >= numSongs-1){
                    onSongStateChange(PAUSED);
                    this.handleShuffleState();

                }else {
                    shuffleSongs.push(newIndex);

                    let nxtIndex = this.getRandomIndex(numSongs);

                    while (shuffleSongs.includes(nxtIndex)){
                        nxtIndex = this.getRandomIndex(numSongs);
                    }
                    newIndex = nxtIndex;
                    this.setShuffleList(shuffleSongs);
                }
            }else{
                newIndex = (newIndex + 1) % numSongs;
            }
        } else {
            if (shuffleMode){
                if (shuffleSongs.length > 0){
                    newIndex = shuffleSongs.pop();
                    this.setShuffleList(shuffleSongs);
                }else{
                    needsUpdate = false;
                    this.player.seekTo(0);
                    this.setShuffleList();
                }
            }else{
                newIndex = newIndex - 1;
                if (newIndex < 0 && songIndex !== 0) {
                    newIndex = 0;
                } else if (newIndex < 0 && songIndex === 0) {
                    needsUpdate = false;
                    this.player.seekTo(0);
                }
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
            songState,
            onSongStateChange,
        } = this.props;

        const { songProgress, songDuration, seekingInProgress, songVolume, songMuted, shuffleMode} = this.state;
        let playPauseRender;
        let volumeRender;
        let shuffleButtonRender;
        let shuffleButtonStyle;

        let songList = Object.values(songs);
        
        let currentSongTitle;
        let currentSongArtist;

        if (songList.length > 0 && songIndex !== null){
            currentSongTitle = songList[songIndex].name;
            currentSongArtist = songList[songIndex].artist;
        }
        
        if(shuffleMode){
            shuffleButtonStyle = {
                color : 'white',
                background : 'rgb(0, 93, 255)',
            };

            shuffleButtonRender =(
                <div className="shuffle-button-container ">
                        <FontAwesomeIcon icon={faRandom} onClick={this.handleShuffleState} className="shuffle-button-icon" style={shuffleButtonStyle}/>
                </div>
            );
        }else{
            shuffleButtonStyle = {
                color : 'rgb(0, 93, 255)',
            };

            shuffleButtonRender =(
                <div className="shuffle-button-container ">
                        <FontAwesomeIcon icon={faRandom} onClick={this.handleShuffleState} className="shuffle-button-icon" style={shuffleButtonStyle}/>
                </div>
            );

        }

        if(songState === PLAYING) {
            playPauseRender = (
                <div id="pause-button" className="media-icon">
                    { pauseSvg(() => onSongStateChange(PAUSED)) }
                </div>

            );
        } else {
            playPauseRender = (
                <div id="play-button" className="media-icon">
                    { playSvg(() => onSongStateChange(PLAYING)) }
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
                    <div
                        className="now-playing"
                        style={{ display: currentSongTitle ? "flex" : "none" }}
                    >
                        Now Playing
                    </div>
                    <div className="song-info-display">
                        <div className="now-playing-title">
                            {currentSongTitle}
                        </div>
                        <div className="now-playing-artist">
                            {currentSongArtist}
                        </div>

                    </div>
                </div>

                <div className="media-controls-container">

                    <div className="media-buttons-container">
                        <div className="skip-button media-icon">
                            { skipButton(() => this.handleSkips(false))}
                        </div>

                        { playPauseRender }

                        <div className="skip-button media-icon">
                            { prevButton(() => this.handleSkips(true)) }
                        </div>
                    </div>
                    { shuffleButtonRender }

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
                            name="volume"
                            type="range"
                            min={0}
                            max={100}
                            step="0.1"
                            value={songMuted ? 0 : songVolume}
                            className="slider"
                            onChange={this.handleVolumeChange}
                        />
                        <output className="volumeValue" style={{left:`calc(${14}% + ${songVolume + 7}px)` }}>{songVolume}%</output>
                    </div>
                </div>

                { songState !== STOPPED &&
                    <ReactPlayer
                        ref={this.ref}
                        onProgress={this.handleSongProgress}
                        onDuration={this.handleSongDuration}
                        onEnded={this.handleSongEnd}
                        className="player-container"
                        playing={songState === PLAYING && !seekingInProgress}
                        progressInterval={100}
                        volume={songVolume / 100}
                        muted={songMuted}
                        url={Object.keys(songs)[songIndex]}
                    />
                }

            </div>
        );
    }
}

MediaControls.propTypes = {
    songs: PropTypes.array.isRequired,
    songState: PropTypes.bool.isRequired,
    onIndexChange: PropTypes.func.isRequired,
    onSongStateChange: PropTypes.func.isRequired,
    songIndex: PropTypes.number.isRequired,
};

export default MediaControls;