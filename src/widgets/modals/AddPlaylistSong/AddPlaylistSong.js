import React from "react";
import PropTypes from "prop-types";
import Modal from "../../../components/Modal/Modal";
import SongList from "../../../components/SongList/SongList";
import "./AddPlaylistSong.scss";

class AddPlaylistSong extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSongs: [],
        };
    }

    componentDidUpdate(prevProps) {
        const { isShowing } = this.props;
        const { isShowing: prevIsShowing } = prevProps;

        if (isShowing !== prevIsShowing) {
            this.setState({
                selectedSongs: [],
            });
        }
    }

    handleSelectedChange = (selectedList) => {
        this.setState({
            selectedSongs: selectedList,
        });
    };

    handleClose = (primaryClicked) => {
        const { onClose, onAddSongs } = this.props;
        const { selectedSongs } = this.state;

        if(primaryClicked) {
            onAddSongs(selectedSongs);
        } else {
            onClose();
        }
    };

    render() {
        const {
            isShowing,
            songs,
            playlistSongs,

        } = this.props;

        const {
            selectedSongs,
        } = this.state;

        // Calculate songs that aren't already in the playlist
        const filteredSongs = {};
        Object.entries(songs).forEach(([songPath, song]) => {
            if (!(songPath in playlistSongs)) {
                filteredSongs[songPath] = song;
            }
        });


        return (
            <Modal
                class
                width={800}
                height="80vh"
                title="Add Songs"
                isShowing={isShowing}
                text="Add"
                disablePrimary={!selectedSongs.length}
                onClose={this.handleClose}
            >
                <div className="add-songs-container">
                    <div className="add-songs-list-border-container">
                        <SongList
                            songs={filteredSongs}
                            showActions={false}
                            showActive={false}
                            onSelectedChange={this.handleSelectedChange}
                            selectedRowCss="add-songs-selected-row"
                            className="add-songs-list-container"
                        />
                    </div>
                    <div className="add-songs-found-container">
                        { selectedSongs.length ? `${selectedSongs.length} songs selected` : ""}
                    </div>
                </div>
            </Modal>
        );
    }
}

export default AddPlaylistSong;