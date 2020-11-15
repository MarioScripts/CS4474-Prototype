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
class CreatePlaylist extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playlistName: "",
        }
    }

    componentDidUpdate(prevProps) {
        const { isShowing } = this.props;
        const { isShowing: prevIsShowing } = prevProps;

        if(prevIsShowing !== isShowing) {
            this.setState({
                playlistName: "",
            });
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

        const {
            playlistName,
        } = this.state;

        const duplicateName = playlistName in playlists;

        return (
            <Modal
                width={700}
                height={500}
                title="New Playlist"
                text="Create"
                isShowing={isShowing}
                onClose={onClose}
                disablePrimary={!playlistName || duplicateName}
            >
                <TextInput width={250} autoFocus onChange={this.handleNameChange} showError={duplicateName}/>

                <Dropdown
                    width={70}
                    options={typeOptions}
                    height={30}
                >
                    None
                </Dropdown>

                
                test
            </Modal>
        );
    }
}

CreatePlaylist.propTypes = {

};

CreatePlaylist.defaultProps = {

};

export default CreatePlaylist;