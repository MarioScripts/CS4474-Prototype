import React from 'react';
import './CreatePlaylist.scss';
import PropTypes from 'prop-types';
import Modal from "../../../components/Modal/Modal";
import TextInput from "../../../components/TextInput/TextInput";

class CreatePlaylist extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playlistName: "",
        }
    }


    handleNameChange = (name) => {
        this.setState({
            playlistName: name,
        });
    };

    render() {
        const {
            songs,
            playlists,
            isShowing,
            onClose
        } = this.props;

        return (
            <Modal
                width={700}
                height={500}
                title="New Playlist"
                text="Create"
                isShowing={isShowing}
                onClose={onClose}
                disablePrimary={true}
            >
                <TextInput width={250} autoFocus onChange={this.handleNameChange} showError/>
            </Modal>
        );
    }
}

CreatePlaylist.propTypes = {

};

CreatePlaylist.defaultProps = {

};

export default CreatePlaylist;