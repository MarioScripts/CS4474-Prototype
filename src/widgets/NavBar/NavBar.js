import React from 'react';
import './NavBar.scss';
import PropTypes from 'prop-types';
import MenuItem from "../../components/MenuItem/MenuItem";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import CreatePlaylist from "../modals/CreatePlaylist/CreatePlaylist";

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePlaylist: "library",
            showNewPlaylistModal: false,
        };
    }

    handleToggleModal = (state) => {
        this.setState({
            showNewPlaylistModal: state
        });
    };

    handleActivateItem = (playlist) => {
        const  { onChange, playlists, library } = this.props;

        this.setState({
            activePlaylist: playlist,
        });

        if (playlist === "library") {
            onChange(library, playlist, false);
        } else {
            onChange(playlists[playlist], playlist, true);
        }

    };

    render() {
        const { activePlaylist, showNewPlaylistModal, songs } = this.state;
        const { playlists } = this.props;

        const playlistRenders = [];
        for(const playlistName of Object.keys(playlists)) {
            playlistRenders.push(
                <MenuItem fontSize={16} active={playlistName === activePlaylist } onClick={() => this.handleActivateItem(playlistName)}>{playlistName}</MenuItem>
            )
        }
        return (
            <div className="navbar-container">
                <CreatePlaylist
                    isShowing={showNewPlaylistModal}
                    onClose={() => this.handleToggleModal(false)}
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
                    onClick={() => this.handleToggleModal(true)}
                >
                    New Playlist
                </Button>
            </div>
        );
    }
}

NavBar.propTypes = {
    playlists: PropTypes.object.isRequired,
    songs: PropTypes.object.isRequired,
};

export default NavBar;