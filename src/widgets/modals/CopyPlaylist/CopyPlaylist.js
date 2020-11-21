import React from "react";
import PropTypes from "prop-types";
import Modal from "../../../components/Modal/Modal";
import TextInput from "../../../components/TextInput/TextInput";
import "./CopyPlaylist.scss";


class CopyPlaylist extends React.Component {

    
    constructor(props) {
        super(props);
       
        this.state = {
            inputIsDefault : true,
            newPlaylistName: ''
        };

    }
    

    handleClose = (primaryClicked) => {
        const { onClose, onSetPlaylistCopy, defValue}= this.props;
        const {newPlaylistName} = this.state;

        this.setState({
            newPlaylistName : '',
        });

        if(primaryClicked) {
            if(newPlaylistName){
                onSetPlaylistCopy(newPlaylistName);
            }else{
                onSetPlaylistCopy(defValue);
            }
        } else {
            onClose();
        }
    };

    handleNameChange = (name) => {
        const {defValue} = this.props;
        if(name && name === defValue){
            this.setState({
                newPlaylistName : name,
                inputIsDefault: true,
            });
        }else{
            this.setState({
                newPlaylistName : name,
                inputIsDefault: false,
            });
        }
    };


    render(){

        const { isShowing, activePlaylist, playlists, defValue} = this.props;
        const {newPlaylistName, inputIsDefault} = this.state;
        
        const duplicateName = playlists && newPlaylistName in playlists;

        const unchangedName = (!newPlaylistName && activePlaylist == defValue);

        const sameName = newPlaylistName === activePlaylist;
        const displayError = duplicateName && !sameName;

        return(
    
            <Modal width={500} height={200} 
            title={"Copy Playlist"} 
            text={"Copy"} 
            isShowing={isShowing} 
            onClose={this.handleClose}
            disablePrimary={duplicateName || (newPlaylistName.length < 1 && !inputIsDefault) || unchangedName}>
                <div className='copyplaylist-content-container'>
                    Name:
                    <div className='copyplaylist-content'>
                    <TextInput width={250} autoFocus onChange={this.handleNameChange} showError={displayError} defaultValue={defValue}/>
                        { displayError ? "Name already exists" : " " }
                    </div>                  
                </div>
            </Modal>
        );
    }

}

CopyPlaylist.propTypes = {
    isShowing : PropTypes.bool.isRequired,
    activePlaylist : PropTypes.string.isRequired,
    playlists : PropTypes.object.isRequired,
    onClose : PropTypes.func.isRequired,
    onSetPlaylistCopy: PropTypes.func.isRequired,
    defValue : PropTypes.string.isRequired,
};

export default CopyPlaylist;