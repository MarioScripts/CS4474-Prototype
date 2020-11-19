import React from "react";
import PropTypes from "prop-types";
import Modal from "../../../components/Modal/Modal";
import "./EditPlaylist.scss";


class EditPlaylist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validName: true,
            newPlaylistName : '',
            inputValue : this.props.activePlaylist,
        };

    }

    handleClose = (primaryClicked) => {
        const { onClose, onSetPlaylistEdit} = this.props;
        const {newPlaylistName} = this.state;

        if(primaryClicked) {
           onSetPlaylistEdit(newPlaylistName);
        } else {
            onClose();
        }
    };

    handleInputChange = (e) => {
        this.setState({
            inputValue : e.target.value,
        });

    };


    handleNameChange = () => {
        
        const {playlists, activePlaylist} = this.props;
        const {inputValue} = this.state;

        const playlistNames = Object.keys(playlists);

        const nameTaken = playlistNames.includes(inputValue);

        if (inputValue != activePlaylist){
            if (inputValue.length == 0){
                this.setState({
                    newPlaylistName: '',
                });
            }else if(nameTaken){
                this.setState({
                    validName: false,
                });
            }else{
                this.setState({
                    validName: true,
                    newPlaylistName: inputValue,
                });
            }
        }else{
            this.setState({
                validName: true,
                newPlaylistName: '',
            });
        }

    };


    render(){

        const { isShowing, activePlaylist} = this.props;
        const {validName, newPlaylistName} = this.state;

        return(
    
            <Modal width={500} height={200} 
            title={"Edit Playlist"} 
            text={"Finish"} 
            isShowing={isShowing} 
            onClose={this.handleClose}
            disablePrimary={!validName || !newPlaylistName.length}>
                <div className='editplaylist-content-container'>
                    <div className='editplaylist-content'>
                        <label for='playlistName'> Name: </label>
                        <input type='text' id='playlistName' name="playlistName"  className="playlist-name-input" style={{borderColor : validName ? 'black' : 'red'}}defaultValue={activePlaylist} onChange={this.handleInputChange} onKeyUp={this.handleNameChange}/>
                    </div>
                    <p className="error-already-exists" style={{display : validName ? 'none' : 'flex' }}> Name already exists</p>
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