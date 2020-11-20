import React from "react";
import PropTypes from "prop-types";
import Modal from "../../../components/Modal/Modal";
import TextInput from "../../../components/TextInput/TextInput";
import "./EditPlaylist.scss";


class EditPlaylist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            prevPlaylist : '',
            newPlaylistName : '',
        };

    }

    handleClose = (primaryClicked) => {
        const { onClose, onSetPlaylistEdit, activePlaylist}= this.props;
        const {newPlaylistName} = this.state;

        if(primaryClicked) {
            this.setState({
                prevPlaylist : newPlaylistName
            });

           onSetPlaylistEdit(newPlaylistName);
        } else {
            this.setState({
                prevPlaylist : activePlaylist
            });
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
        const {newPlaylistName, prevPlaylist} = this.state;

        const duplicateName = playlists && newPlaylistName in playlists;

        let checkInputDefaultName = newPlaylistName;
        let sameName;
        let displayError;

        if (newPlaylistName === prevPlaylist){
            displayError = false;    
        }else{
            sameName = newPlaylistName === activePlaylist;
            displayError = duplicateName && !sameName;
        } 
        

        return(
    
            <Modal width={500} height={200} 
            title={"Edit Playlist"} 
            text={"Finish"} 
            isShowing={isShowing} 
            onClose={this.handleClose}
            disablePrimary={duplicateName}>
                <div className='editplaylist-content-container'>
                    Name:
                    <div className='editplaylist-content'>
                    <TextInput width={250} autoFocus onChange={this.handleNameChange} showError={displayError} defValue={activePlaylist}/>
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