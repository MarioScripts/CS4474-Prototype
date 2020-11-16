import React from 'react';
import './CreatePlaylist.scss';
import PropTypes from 'prop-types';
import Modal from "../../../components/Modal/Modal";
import TextInput from "../../../components/TextInput/TextInput";
import Dropdown from "../../../components/Dropdown/Dropdown";

const typeOptions = [
    "Artist",
    "Genre"
];

const ARTIST_TYPE = "Artist";
const GENRE_TYPE = "Genre";
class CreatePlaylist extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playlistName: "",
            selectedType: null,
            selections: null,
            songsFound: [],
        }
    }

    componentDidUpdate(prevProps) {
        const { isShowing } = this.props;
        const { isShowing: prevIsShowing } = prevProps;

        if(prevIsShowing !== isShowing) {
            this.setState({
                playlistName: "",
                selectedType: null,
                selections: null,
                songsFound: [],
            });
        }
    }

    handleNameChange = (name) => {
        this.setState({
            playlistName: name,
        });
    };

    handleTypeSelect = (index, value, isUnselect) => {
        const { songs } = this.props;
        const type = value === GENRE_TYPE ? "genre" : "artist";

        const selection = new Set();
        if (!isUnselect) {
            Object.values(songs).forEach((song) => {
                if (song[type] && !selection.has(song[type])) {
                    selection.add(song[type]);
                }
            });
        }

        this.setState({
            selectedType: isUnselect ? null : type,
            selections: isUnselect ? null : [...selection],
            songsFound: [],
        });
    };

    handleSelectionSelect = (index, value, isUnselect) => {
        const { selectedType } = this.state;
        const { songs } = this.props;

        const songsFound = [];
        if(selectedType !== null) {
            Object.entries(songs).forEach(([path, song]) => {
                if (song[selectedType] === value) {
                    songsFound.push(path);
                }
            });
        }

        this.setState({
            songsFound: isUnselect ? [] : songsFound,
        });
    };

    handleCreatePlaylist = (state) => {
        const { onClose, onCreate } = this.props;
        const { playlistName, songsFound } = this.state;

        if (state) {
            onCreate(playlistName, songsFound);
        }

        onClose();
    };

    render() {
        const {
            playlists,
            isShowing,
        } = this.props;

        const {
            playlistName,
            songsFound,
            selections
        } = this.state;

        const duplicateName = playlists && playlistName in playlists;

        return (
            <Modal
                width={700}
                height={400}
                title="New Playlist"
                text="Create"
                isShowing={isShowing}
                onClose={this.handleCreatePlaylist}
                disablePrimary={!playlistName || duplicateName}
            >
                <div className="new-playlist-name-container">
                    Name:
                    <div className="new-playlist-input">
                        <TextInput width={250} autoFocus onChange={this.handleNameChange} showError={duplicateName}/>
                        { duplicateName ? "Name already exists" : "" }
                    </div>
                </div>


                <div className="quick-add-container">
                    <div className="quick-add-header">
                        Quick Add
                    </div>

                    <div className="quick-add-dropdown-container">
                        <div className="quick-add-dropdown">
                            Type:
                            <Dropdown
                                width={70}
                                options={typeOptions}
                                height={30}
                                onSelect={this.handleTypeSelect}
                            >
                                None
                            </Dropdown>
                        </div>


                        <div className="quick-add-dropdown">
                            Selection:
                            <Dropdown
                                width={150}
                                options={selections}
                                height={30}
                                onSelect={this.handleSelectionSelect}
                            >
                                None
                            </Dropdown>
                        </div>

                    </div>

                    <div className="quick-add-songs-found">
                        { songsFound.length ? `${songsFound.length} songs found` : "" }
                    </div>
                </div>
            </Modal>
        );
    }
}

CreatePlaylist.propTypes = {
    playlists: PropTypes.object.isRequired,
    isShowing: PropTypes.bool,
};

CreatePlaylist.defaultProps = {
    isShowing: false,
};

export default CreatePlaylist;