import React from "react";
import PropTypes from "prop-types";
import Modal from "../../../components/Modal/Modal";
import TextInput from "../../../components/TextInput/TextInput";
import "./EditSong.scss";

class EditSong extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            album_artist: "",
            genre: "",
            album: "",
            // date: "",
        }
    }

    componentDidUpdate(prevProps) {
        const { isShowing, song } = this.props;
        const { isShowing: prevIsShowing } = prevProps;

        if(isShowing !== prevIsShowing && song) {
            this.setState({
                title: song.name ? song.name : "",
                album_artist: song.artist ? song.artist : "",
                genre: song.genre ? song.genre : "",
                album: song.album ? song.album : "",
            })
        }
    }

    handleInputChange = (key, text) => {
        this.setState({
            [key]: text,
        });
    };

    handleClose = (primaryClicked) => {
        const { onClose, onSave } = this.props;
        if (primaryClicked) {
            onSave(this.state);
        } else {
            onClose();
        }
    };

    render() {
        const { song, isShowing } = this.props;
        const { title } = this.state;

        return (
            <Modal
                width={500}
                height={500}
                title="Edit Song"
                text="Save"
                isShowing={isShowing}
                onClose={this.handleClose}
                disablePrimary={title.length === 0}
            >
                <div className="edit-song-row">
                    <div className="edit-song-label">Title*: </div>
                    <TextInput
                        defaultValue={song && song.name ? song.name : ""}
                        onChange={(text) => this.handleInputChange("title", text)}
                    />
                </div>

                <div className="edit-song-row">
                    <div className="edit-song-label">Artist: </div>
                    <TextInput
                        defaultValue={song && song.artist ? song.artist : ""}
                        onChange={(text) => this.handleInputChange("album_artist", text)}
                    />
                </div>

                <div className="edit-song-row">
                    <div className="edit-song-label">Genre: </div>
                    <TextInput
                        defaultValue={song && song.genre ? song.genre : ""}
                        onChange={(text) => this.handleInputChange("genre", text)}
                    />
                </div>

                <div className="edit-song-row">
                    <div className="edit-song-label">Album: </div>
                    <TextInput
                        defaultValue={song && song.album ? song.album : ""}
                        onChange={(text) => this.handleInputChange("album", text)}
                    />
                </div>

                {/*<div className="edit-song-row">*/}
                {/*    <div className="edit-song-label">Date: </div>*/}
                {/*    <TextInput defaultValue={song && song.name ? song.name : ""}/>*/}
                {/*</div>*/}
            </Modal>
        );
    }
}

EditSong.propTypes = {
    song: PropTypes.object.isRequired,
    isShowing: PropTypes.bool,
    onSave: PropTypes.func,
    onClose: PropTypes.func,
};

EditSong.defaultProps = {
    isShowing: false,
    onSave: () => {},
    onClose: () => {},
};

export default EditSong;