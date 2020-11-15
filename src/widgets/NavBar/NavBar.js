import React from 'react';
import './NavBar.scss';
import PropTypes from 'prop-types';
import MenuItem from "../../components/MenuItem/MenuItem";
import Button from "../../components/Button/Button";
import CreatePlaylist from "../modals/CreatePlaylist/CreatePlaylist";
const settings = window.require("electron-settings");

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewPlaylistModal: false,
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

    handleActivateItem = (playlist) => {
        const  { onChange, playlists, library } = this.props;

        if (playlist === "library") {
            onChange(library, playlist, false);
        } else {
            onChange(playlists[playlist], playlist, true);
        }

    };

    render() {
        const { showNewPlaylistModal } = this.state;
        const { playlists, songs, onCreatePlaylist, activePlaylist } = this.props;

        const playlistRenders = [];

        if (playlists) {
            for(const playlistName of Object.keys(playlists)) {
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

                {playlistRenders}

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
    onCreatePlaylist: PropTypes.func.isRequired,
    activePlaylist: PropTypes.string.isRequired,
    songs: PropTypes.object.isRequired,
};

export default NavBar;