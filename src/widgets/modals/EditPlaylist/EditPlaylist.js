import React from "react";
import PropTypes from "prop-types";
import Modal from "../../../components/Modal/Modal";
import TextInput from "../../../components/TextInput/TextInput";
import "./EditPlaylist.scss";


class EditPlaylist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newPlaylistName : this.props.activePlaylist,
        };

    }

    handleClose = (primaryClicked) => {
        const { onClose, onSetPlaylistEdit}= this.props;
        const {newPlaylistName} = this.state;

        this.setState({
            newPlaylistName : '',
        });

        if(primaryClicked) {
           onSetPlaylistEdit(newPlaylistName);
        } else {
            onClose();
        }
    };

    handleNameChange = (name) => {
        this.setState({
            newPlaylistName : name,
        });

    };

    render(){

        const { isShowing, activePlaylist, playlists} = this.props;
        const {newPlaylistName} = this.state;

        const duplicateName = playlists && newPlaylistName in playlists;

        const sameName = newPlaylistName === activePlaylist;
        const displayError = duplicateName && !sameName;
        

        return(
    
            <Modal width={500} height={200} 
            title={"Edit Playlist"} 
            text={"Finish"} 
            isShowing={isShowing} 
            onClose={this.handleClose}
            disablePrimary={duplicateName || newPlaylistName.length < 1}>
                <div className='editplaylist-content-container'>
                    Name:
                    <div className='editplaylist-content'>
                    <TextInput width={250} autoFocus onChange={this.handleNameChange} showError={displayError} defaultValue={activePlaylist}/>
                        { displayError ? "Name already exists" : " " }
                    </div>                  
                </div>
            </Modal>
        );
    }

}

EditPlaylist.propTypes = {
    isShowing : PropTypes.bool.isRequired,
    activePlaylist : PropTypes.string.isRequired,
    playlists : PropTypes.object.isRequired,
    onClose : PropTypes.func.isRequired,
    onSetPlaylistEdit: PropTypes.func.isRequired,
};

export default EditPlaylist;