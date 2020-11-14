import './App.scss';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import NavBar from "./widgets/NavBar/NavBar";
import Modal from "./components/Modal/Modal";
import MediaControls from "./widgets/MediaControls/MediaControls";
const settings = window.require("electron-settings");
const dialog = window.require("electron").remote.dialog;
import {expandSongs, PAUSED, PLAYING} from "./utils/songUtils";
import Content from "./widgets/Content/Content";

// Mock data for now, just to test some stuff
const playlists = {
    "Playlist 1": [
        "C:\\Users\\Matt\\Desktop\\songs\\Yoo\\yoo3\\megaman_2_dr_wily.mp3"
    ],
    "Playlist 2": [
        "C:\\Users\\Matt\\Desktop\\songs\\Yoo\\yoo3\\megaman_2_dr_wily.mp3"
    ],
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.player = React.createRef();
        this.state = {
            activeSongList: {},
            activeSongIndex: 0,
            viewableSongList: {},
            activeKey: "library",
            viewableKey: "library",
            songState: PAUSED,
            isPlaylist: false,
            firstTimeSetup: false,
        }
    }

    async componentDidMount() {
        // If there's no settings, perform first time setup
        if (!Object.keys(await settings.get()).length) {
            this.setState({
               firstTimeSetup: true,
            });
        } else {
            const songList = await this.createSongList();
            this.setState({
                activeSongList: songList,
                viewableSongList: songList,
            });
        }
    }

    createSongList = async (list) => {
        if (!list) {
            list = settings.getSync("library");
        }

        return await expandSongs(list);
    };

    handleNavChange = async (content, key, isPlaylist) => {
        this.setState({
            viewableSongList: await this.createSongList(content),
            viewableKey: key,
            isPlaylist,
        });
    };

    handleSetup = async (primaryClicked) => {
        const library = [];
        if (primaryClicked) {
            const filesSelected = await dialog.showOpenDialog({properties: ['openDirectory']});

            filesSelected.filePaths.forEach((path) => {
                library.push(path);
            });
        }

        await settings.set("library", library);

        const songList = await this.createSongList();
        this.setState({
            firstTimeSetup: false,
            activeSongList: songList,
            viewableSongList: songList,
        });
    };

    handleSongIndexChange = (newIndex) => {
        this.setState({
            activeSongIndex: newIndex,
        });
    };

    handleSongStateChange = (newState) => {
        this.setState({
            songState: newState,
        });
    };

    handlePlayAll = () => {
        const { viewableSongList, viewableKey } = this.state;
        this.setState({
            activeSongIndex: 0,
            activeSongList: viewableSongList,
            activeKey: viewableKey,
            songState: PLAYING,
        });
        this.player.current.resetSong();
    };

    handleSongChange = (index, state) => {
        const { viewableKey, viewableSongList, activeSongIndex, activeKey } = this.state;

        if (index !== activeSongIndex && activeKey !== viewableKey) {
            this.player.current.resetSong();
        }

        this.setState({
            activeSongIndex: index,
            songState: state,
            activeKey: viewableKey,
            activeSongList: viewableSongList,
        });
    };

    handleSongEdit = (index) => {
        // TODO: Edit song details
    };

    handleSongDelete = (index) => {
        // TODO: Delete song (different functionality based on if isPlaylist or not)
    };

    render() {
        const { viewableSongList, firstTimeSetup, activeSongList, isPlaylist, activeSongIndex, activeKey, viewableKey, songState } = this.state;
        return (
            <div className="container">
                <NavBar
                    onChange={this.handleNavChange}
                    playlists={playlists}
                    library={settings.getSync("library")}
                    songs={activeSongList}
                />

                <Modal
                    width={700}
                    height={300}
                    title="Setup"
                    isShowing={firstTimeSetup}
                    text="Import"
                    cancelText="Skip"
                    onClose={this.handleSetup}
                >
                    <div className="prompt">
                        Start off with importing your music library! You can add more music later on.
                    </div>
                </Modal>

                <Content
                    songs={viewableSongList}
                    isPlaylist={isPlaylist}
                    activeSongIndex={activeKey === viewableKey ? activeSongIndex : null}
                    onPlayAll={this.handlePlayAll}
                    isPlaying={songState === PLAYING}
                    onSongStateChange={this.handleSongChange}
                    onSongEdit={this.handleSongEdit}
                    onSongDelete={this.handleSongDelete}
                />

                <div className="controls">
                    <MediaControls
                        songs={activeSongList}
                        songIndex={activeSongIndex}
                        songState={songState}
                        onSongStateChange={this.handleSongStateChange}
                        onIndexChange={this.handleSongIndexChange}
                        ref={this.player}
                    />
                </div>
            </div>
        );
    }
}

export default hot(App);
