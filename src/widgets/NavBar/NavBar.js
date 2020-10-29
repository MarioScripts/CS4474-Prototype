import React from 'react';
import './NavBar.scss';
import PropTypes from 'prop-types';
import MenuItem from "../../components/MenuItem/MenuItem";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePlaylist: "Library",
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

        if (playlist === "Library") {
            onChange(library.content);
        } else {
            onChange(playlists[playlist].content);
        }

    };

    render() {
        const { activePlaylist, showNewPlaylistModal } = this.state;
        const { playlists } = this.props;

        const playlistRenders = [];
        for(const playlistName of Object.keys(playlists)) {
            playlistRenders.push(
                <MenuItem fontSize={16} active={playlistName === activePlaylist } onClick={() => this.handleActivateItem(playlistName)}>{playlistName}</MenuItem>
            )
        }
        return (
            <div className="navbar-container">
                <Modal
                    width={700}
                    height={500}
                    title="New Playlist"
                    cancelText="Cancel"
                    text="Create"
                    disablePrimary={true}
                    isShowing={showNewPlaylistModal}
                    onClose={() => this.handleToggleModal(false)}
                >

                </Modal>
                <MenuItem
                    fontSize={22}
                    active={activePlaylist === "Library"}
                    onClick={() => this.handleActivateItem("Library")}
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
};

export default NavBar;