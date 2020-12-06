import './App.scss';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import NavBar from "./widgets/NavBar/NavBar";
import Modal from "./components/Modal/Modal";
import MediaControls from "./widgets/MediaControls/MediaControls";
const settings = window.require("electron-settings");
const dialog = window.require("electron").remote.dialog;
import {expandSongs, PAUSED, PLAYING, STOPPED, writeSongMetadata} from "./utils/songUtils";
import Content from "./widgets/Content/Content";
import AddPlaylistSong from "./widgets/modals/AddPlaylistSong/AddPlaylistSong";
import EditSong from "./widgets/modals/EditSong/EditSong";
import EditPlaylist from "./widgets/modals/EditPlaylist/EditPlaylist";
import CopyPlaylist from "./widgets/modals/CopyPlaylist/CopyPlaylist";
import {act} from "@testing-library/react";


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
            playlistOrder: [],
            firstTimeSetup: false,
            deletedSongInfo: null,

            editedSong: null,
            editSongLoading: false,
            showAddPlaylistSong: false,
            showEditSong: false,
            showEditPlaylist: false,
            showCopyPlaylist: false,
            showDeletePlaylist: false,
            showDeleteSong: false
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
                playlistOrder: settings.getSync("playlistOrder"),
            });
        }
    }

    createSongList = async (isAdd, list) => {
        if (!list) {
            list = settings.getSync("library");
        }

        let expandedSongs = await expandSongs(list);
        const libraryFilter = new Set(settings.getSync("libraryFilter") || []);

        if (!isAdd) {
            expandedSongs = Object.fromEntries(Object.entries(expandedSongs).filter(([key, value]) => !libraryFilter.has(key)));
        } else {
            Object.entries(expandedSongs).forEach(([key, value]) => {
                if (libraryFilter.has(key)) {
                    libraryFilter.delete(key);
                }
            });

            settings.setSync("libraryFilter", Array.from(libraryFilter));
        }

        return expandedSongs;
    };

    handleNavChange = async (content, key, isPlaylist) => {
        this.setState({
            viewableSongList: await this.createSongList(false, content),
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

            const songList = await this.createSongList(true);
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
        const { viewableSongList, activeSongIndex, songState } = this.state;
        this.player.current.resetSong();

        this.setState({
            editedSong: Object.values(viewableSongList)[index],
            showEditSong: true,
            showEditSongModal: true,
            songState: index === activeSongIndex ? STOPPED : songState,

        });
    };

    handleSongEditSave = async (data) => {
        const { editedSong, viewableKey } = this.state;

        // Sometimes, if the user tries to edit a song that was playing, it will take a second
        // for the file system to allow editing the song. In this case, we will show a loading spinner until a successful write happens
        // (or until it times out)
        this.setState({
            editSongLoading: true,
        });

        await writeSongMetadata(editedSong.path, data);

        this.setState({
            editedSong: null,
            showEditSongModal: false,
            editSongLoading: false,
            viewableSongList: await this.createSongList(false, settings.getSync(viewableKey)),
        });
    };

    handleSongEditModalClose = () => {
        this.setState({
            editSong: null,
            showEditSongModal: false,
        });
    };

    handleSongDelete = (songInfo) => {
        this.setState({
            showDeleteSong: true,
            deletedSongInfo: songInfo,
        });
    };

    handleSongDeleteConfirm = async (primaryClicked) => {
        const { isPlaylist, viewableKey, viewableSongList, deletedSongInfo, activeKey, activeSongList, activeSongIndex, songState } = this.state;

        const deletedSongIsPlaying = activeKey === viewableKey && songState === PLAYING && activeSongIndex === deletedSongInfo.index;

        let newActiveIndex = activeSongIndex;
        if (deletedSongIsPlaying) {
            newActiveIndex = null;
            this.player.current.resetSong(true);
        } else if (deletedSongInfo.index < activeSongIndex) {
            newActiveIndex--;
        }

        if (primaryClicked) {
            if (isPlaylist) {
                const playlists = settings.getSync("playlists");
                const filteredList = playlists[viewableKey].filter((song) => song !== deletedSongInfo.path);
                playlists[viewableKey] = filteredList;

                settings.setSync("playlists", playlists);
                this.setState({
                    playlists: playlists,
                    viewableSongList: await this.createSongList(false, filteredList),
                    activeSongList: activeKey === viewableKey ? await this.createSongList(false, filteredList) : activeSongList,
                    activeSongIndex: newActiveIndex,
                    songState: deletedSongIsPlaying ? PAUSED : songState,
                })
            } else {
                const libraryFilter = new Set(settings.getSync("libraryFilter") || []);
                libraryFilter.add(deletedSongInfo.path);
                settings.setSync("libraryFilter", Array.from(libraryFilter));

                const songs = await this.createSongList(false);
                this.setState({
                    viewableSongList: songs,
                    librarySongList: songs,
                    activeSongList: activeKey === viewableKey ? songs : activeSongList,
                    activeSongIndex: newActiveIndex,
                    songState: deletedSongIsPlaying ? PAUSED : songState,
                });
            }
        }

        this.setState({
            showDeleteSong: false,
            deletedSongInfo: null,

        });
    };

    handleCreateSongPlaylist = async (name, songList) => {
        const currentPlaylists = settings.getSync("playlists") || {};
        currentPlaylists[name] = songList;

        const playlistOrder = settings.getSync("playlistOrder") || [];
        playlistOrder.push(name);

        settings.setSync("playlists", currentPlaylists);
        settings.setSync("playlistOrder", playlistOrder);

        this.setState({
            playlists: currentPlaylists,
            playlistOrder: playlistOrder,
            viewableKey: name,
            isPlaylist: true,
            viewableSongList: await this.createSongList(false, songList),
        });
    };

    handleShowAddSongModal = async (isPlaylist, selectedIndex) => {
        if (isPlaylist) {
            this.setState({
                showAddPlaylistSong: true,
            });
        } else {

            // 0 selectedIndex = add file, 1 selectedIndex = add folder
            const library = settings.getSync("library");
            let filesSelected;

            // Add file
            if (selectedIndex === 0) {
                filesSelected = await dialog.showOpenDialog({properties: ['openFile', 'multiSelections']});
            } else {
                filesSelected = await dialog.showOpenDialog({properties: ['openDirectory', 'multiSelections']});
            }

            filesSelected.filePaths.forEach((path) => {
                if (!library.includes(path)) {
                    library.push(path);
                }
            });

            await settings.set("library", library);

            const songs = await this.createSongList(true, library);
            this.setState({
                viewableSongList: songs,
                librarySongList: songs,
            });
        }
    };

    handleShowEditPlaylistModal = ()=>{
        this.setState({
            showEditPlaylist: true,
        });
    };

    handleCloseEditPlaylistModal = () =>{
        this.setState({
            showEditPlaylist: false,
        });
    };

    handleShowCopyPlaylistModal = ()=>{
        this.setState({
            showCopyPlaylist: true,
        });
    };

    handleCloseCopyPlaylistModal = () =>{
        this.setState({
            showCopyPlaylist: false,
        });
    };

    handleCloseAddPlaylistSongModal = () => {
        this.setState({
            showAddPlaylistSong: false,
        });
    };

    handleSetPlaylistName = (newName) => {
        const { viewableKey } = this.state;
        const playlists = settings.getSync("playlists");
        const playlistOrder = settings.getSync("playlistOrder");
        const playlistSongs = playlists[viewableKey];

        playlists[newName] = playlistSongs;
        delete playlists[viewableKey];

        const indexFound = playlistOrder.indexOf(viewableKey);
        if (indexFound !== -1) {
            playlistOrder[indexFound] = newName;
        }

        settings.setSync("playlists", playlists);
        settings.setSync("playlistOrder", playlistOrder);


        this.setState({
            playlists : playlists,
            playlistOrder : playlistOrder,
            viewableKey : newName,
            showEditPlaylist: false,
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
            viewableSongList: await this.createSongList(false, newSongList),
            showAddPlaylistSong: false,
        });
    };

    handleCopyPlaylist = (newName) => {
        const { viewableKey } = this.state;
        const playlists = settings.getSync("playlists");
        const playlistOrder = settings.getSync("playlistOrder");
        const playlistSongs = playlists[viewableKey];

        playlists[newName] = playlistSongs;
        playlistOrder.push(newName);

        settings.setSync("playlists", playlists);
        settings.setSync("playlistOrder", playlistOrder);

        this.setState({
            playlists : playlists,
            playlistOrder : playlistOrder,
            viewableKey : newName,
            showCopyPlaylist: false,
        });
    }

    generateCopyPlaylistDefaultValue = () =>{

        const {isPlaylist, playlists,viewableKey} = this.state;

        const fixedKey = viewableKey.replaceAll("\(", "\\(").replaceAll("\)", "\\)");
        const regexp = new RegExp(`^${fixedKey}$|^${fixedKey}\\(\\d+\\)$`);

        let numCopies = 0;

        if (isPlaylist && playlists){

            const playListNames = Object.keys(playlists);

            var copies = playListNames.filter((val) => {
                return regexp.test(val);
            });

           numCopies = copies.length;
        }
        return numCopies === 0 ? viewableKey:  viewableKey + "(" + String(numCopies) + ")";

    };

    handleOpenDeletePlaylistModal = () => {
        this.setState({
            showDeletePlaylist: true,
        });
    };

    handleDeletePlaylist = (primaryClicked) => {
        const { viewableKey, activeKey, activeSongIndex, songState, librarySongList } = this.state;

        if (primaryClicked) {
            const deletedPlaylistWasActive = viewableKey === activeKey;
            const playlists = settings.getSync("playlists");
            let playlistOrder = settings.getSync("playlistOrder");

            playlistOrder = playlistOrder.filter((playlist) => playlist !== viewableKey);
            delete playlists[viewableKey];

            settings.setSync("playlists", playlists);
            settings.setSync("playlistOrder", playlistOrder);

            if (deletedPlaylistWasActive) {
                this.player.current.resetSong(true);
            }

            this.setState({
                showDeletePlaylist: false,
                viewableKey: "library",
                activeKey: null,
                viewableSongList: librarySongList,
                activeSongList: {},
                isPlaylist: false,
                playlists,
                playlistOrder,
                activeSongIndex: deletedPlaylistWasActive ? null : activeSongIndex,
                songState: deletedPlaylistWasActive ? STOPPED : songState,
            });
        } else {
            this.setState({
                showDeletePlaylist: false,
            });
        }
    };


    render() {
        const {
            viewableSongList,
            firstTimeSetup,
            activeSongList,
            isPlaylist,
            activeSongIndex,
            activeKey,
            viewableKey,
            songState,
            librarySongList,
            playlists,
            showAddPlaylistSong,
            editedSong,
            showEditSongModal,
            editSongLoading,
            showEditPlaylist,
            showCopyPlaylist,
            showDeleteSong,
            deletedSongInfo,
            playlistOrder,
            showDeletePlaylist,
        } = this.state;

        return (
            <div className="container">
                <NavBar
                    onChange={this.handleNavChange}
                    playlists={playlists}
                    playlistOrder={playlistOrder}
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

                <EditSong
                    isShowing={showEditSongModal}
                    song={editedSong}
                    onClose={this.handleSongEditModalClose}
                    onSave={this.handleSongEditSave}
                    isLoading={editSongLoading}
                />

                <EditPlaylist
                    isShowing={showEditPlaylist}
                    activePlaylist={isPlaylist ? viewableKey : ''}
                    playlists={playlists}
                    onClose={this.handleCloseEditPlaylistModal}
                    onSetPlaylistEdit={this.handleSetPlaylistName}
                />

                <CopyPlaylist
                    isShowing={showCopyPlaylist}
                    activePlaylist={isPlaylist ? viewableKey : ''}
                    playlists={playlists}
                    onClose={this.handleCloseCopyPlaylistModal}
                    onSetPlaylistCopy={this.handleCopyPlaylist}
                    defValue={isPlaylist ? this.generateCopyPlaylistDefaultValue() : ''}
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

                <Modal
                    height={180}
                    width={600}
                    title="Remove Song"
                    isShowing={showDeleteSong}
                    text="Remove"
                    isDelete
                    onClose={this.handleSongDeleteConfirm}
                >
                    <div className="prompt">Are you sure you want to remove <strong>{deletedSongInfo && viewableSongList[deletedSongInfo.path] ? viewableSongList[deletedSongInfo.path].name : ""}</strong> from <strong>{viewableKey}</strong>?</div>
                </Modal>

                <Modal
                    height={180}
                    width={600}
                    title="Delete Playlist"
                    isShowing={showDeletePlaylist}
                    text="Delete"
                    isDelete
                    onClose={this.handleDeletePlaylist}
                >
                    <div className="prompt">Are you sure you want to permanently delete <strong>{ viewableKey }</strong>?</div>
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
                    onPlaylistEdit={this.handleShowEditPlaylistModal}
                    onPlaylistCopy={this.handleShowCopyPlaylistModal}
                    onPlaylistDelete={this.handleOpenDeletePlaylistModal}
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
