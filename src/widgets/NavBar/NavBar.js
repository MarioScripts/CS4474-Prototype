import React from 'react';
import './NavBar.scss';
import PropTypes from 'prop-types';
import MenuItem from "../../components/MenuItem/MenuItem";
import Button from "../../components/Button/Button";
import CreatePlaylist from "../modals/CreatePlaylist/CreatePlaylist";
import ViewPlaylists from "../ViewPlaylists/ViewPlaylists";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCaretDown} from "@fortawesome/free-solid-svg-icons";
const settings = window.require("electron-settings");

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewPlaylistModal: false,
            showAllPlaylists: false,
        };
    }

    handleClosePlaylistModal = () => {
        this.setState({
            showNewPlaylistModal: false
        });
    };

    handleOpenPlaylistModal = () => {
        this.setState({
            showNewPlaylistModal: true
        });
    };

    handleShowAllPlaylistsButtonToggle = () => {
        const {showAllPlaylists} = this.state;
        this.setState({
            showAllPlaylists: !showAllPlaylists
        });
    }

    handleOutsideClosePlaylist = () =>{
        const {showAllPlaylists} = this.state;
        if (showAllPlaylists === true){
            this.setState({
                showAllPlaylists: !showAllPlaylists
            });
        }
    }

    handlePlaylistDropdownSelect = (playlist) => {
        this.handleShowAllPlaylistsButtonToggle();
        this.handleActivateItem(playlist);
    }

    handleActivateItem = (playlist) => {
        const  { onChange, playlists, library } = this.props;

        if (playlist === "library") {
            onChange(library, playlist, false);
        } else {
            onChange(playlists[playlist], playlist, true);
        }

    };

    render() {
        const { showNewPlaylistModal, showAllPlaylists } = this.state;
        const { playlists, songs, onCreatePlaylist, activePlaylist, playlistOrder } = this.props;

        const showButton = playlists ? true : false;

        const viewAllPlaylistButtonRender = (
            <div
                className="playlist-dropdown-main-button-navbar"
                onClick={this.handleShowAllPlaylistsButtonToggle}
                style={{display: showButton && !showAllPlaylists ? 'flex' : 'none'}}
            >
                <FontAwesomeIcon icon={faCaretDown}/>
            </div>
        );
        
        
        const playlistRenders = [];

        if (playlists) {
            for(const playlistName of playlistOrder) {
                playlistRenders.push(
                    <MenuItem
                        fontSize={16}
                        active={playlistName === activePlaylist }
                        onClick={() => this.handleActivateItem(playlistName)}>{playlistName}
                    </MenuItem>
                )
            }
        }

        return (
            <div className="navbar-container">
                <CreatePlaylist
                    isShowing={showNewPlaylistModal}
                    onClose={this.handleClosePlaylistModal}
                    onCreate={onCreatePlaylist}
                    songs={songs}
                    playlists={playlists}
                >

                </CreatePlaylist>

                <MenuItem
                    fontSize={22}
                    active={activePlaylist === "library"}
                    onClick={() => this.handleActivateItem("library")}
                >
                    Library
                </MenuItem>

                <div className="navbar-divider"/>
                <div  className="playlist-container">
                    {playlistRenders}
                </div>

                {viewAllPlaylistButtonRender}

                <ViewPlaylists 
                    className="navbar-view-playlists"
                    isShowing={showAllPlaylists}
                    playlists={playlistOrder}
                    activePlaylist={activePlaylist}
                    onSelect={this.handlePlaylistDropdownSelect}
                    onClose={this.handleOutsideClosePlaylist}
                />

                <Button
                    className="filled-button navbar-new-playlist"
                    height={10}
                    width={75}
                    fontSize={14}
                    onClick={this.handleOpenPlaylistModal}
                >
                    New Playlist
                </Button>
            </div>
        );
    }
}

NavBar.propTypes = {
    playlists: PropTypes.object.isRequired,
    playlistOrder: PropTypes.array.isRequired,
    onCreatePlaylist: PropTypes.func.isRequired,
    activePlaylist: PropTypes.string.isRequired,
    songs: PropTypes.object.isRequired,
};

export default NavBar;