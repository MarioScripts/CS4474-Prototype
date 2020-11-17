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
import AddPlaylistSong from "./widgets/modals/AddPlaylistSong/AddPlaylistSong";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.player = React.createRef();
        this.state = {
            activeSongList: {},
            activeSongIndex: null,
            viewableSongList: {},
            librarySongList: {},
            activeKey: "library",
            viewableKey: "library",
            songState: PAUSED,
            isPlaylist: false,
            playlists: null,
            firstTimeSetup: false,

            showAddPlaylistSong: false,
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
                librarySongList: songList,
                playlists: settings.getSync("playlists"),
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

            await settings.set("library", library);

            const songList = await this.createSongList();
            this.setState({
                firstTimeSetup: false,
                activeSongList: songList,
                viewableSongList: songList,
                librarySongList: songList,
            });
        } else {
            this.setState({
                firstTimeSetup: false,
            });
        }
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

    handleCreateSongPlaylist = async (name, songList) => {
        const currentPlaylists = settings.getSync("playlists") || {};
        currentPlaylists[name] = songList;

        settings.setSync("playlists", currentPlaylists);

        this.setState({
            playlists: currentPlaylists,
            viewableKey: name,
            viewableSongList: await this.createSongList(songList),
        });
    };

    handleShowAddSongModal = (isPlaylist, selectedIndex) => {
        if (isPlaylist) {
            this.setState({
                showAddPlaylistSong: true,
            });
        } else {
            // TODO: Handle library add
            // 0 selectedIndex = add file, 1 selectedIndex = add folder
        }
    };

    handleCloseAddPlaylistSongModal = () => {
        this.setState({
            showAddPlaylistSong: false,
        });
    };

    handleAddPlaylistSongs = async (songs) => {
        const { viewableKey } = this.state;
        const playlists = settings.getSync("playlists");
        const playlistSongs = playlists[viewableKey];
        const newSongList = playlistSongs.concat(songs);

        playlists[viewableKey] = newSongList;
        settings.setSync("playlists", playlists);

        this.setState({
            viewableSongList: await this.createSongList(newSongList),
            showAddPlaylistSong: false,
        });
    };

    render() {
        const { viewableSongList, firstTimeSetup, activeSongList, isPlaylist, activeSongIndex, activeKey, viewableKey, songState, librarySongList, playlists, showAddPlaylistSong } = this.state;

        return (
            <div className="container">
                <NavBar
                    onChange={this.handleNavChange}
                    playlists={playlists}
                    library={settings.getSync("library")}
                    songs={librarySongList}
                    onCreatePlaylist={this.handleCreateSongPlaylist}
                    activePlaylist={viewableKey}
                />

                <AddPlaylistSong
                    songs={librarySongList}
                    playlistSongs={viewableSongList}
                    isShowing={showAddPlaylistSong}
                    onClose={this.handleCloseAddPlaylistSongModal}
                    onAddSongs={this.handleAddPlaylistSongs}
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
                    disableAddSong={Object.keys(viewableSongList).length === Object.keys(librarySongList).length}
                    onSongStateChange={this.handleSongChange}
                    onSongEdit={this.handleSongEdit}
                    onSongDelete={this.handleSongDelete}
                    onAddSong={this.handleShowAddSongModal}
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
