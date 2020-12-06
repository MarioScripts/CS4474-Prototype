import React from 'react';
import PropTypes from 'prop-types';
import './ViewPlaylists.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretUp} from "@fortawesome/free-solid-svg-icons";


class ViewPlaylists extends React.Component{
    constructor(props){
        super(props);
        this.componentRef = React.createRef();

    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    handleClickOutside = (e) => {
        const {onClose} = this.props;

        if (this.componentRef
            && this.componentRef.current
            && !this.componentRef.current.contains(e.target)
            && !this.componentRef.current.parentElement.contains(e.target)
        ) {
            onClose();
        }
    };

    handleSelectValue = (value) => {
        const { onSelect } = this.props;

        onSelect(value);
    };

    handleCloseButtonClick = () =>{
        const {onClose} = this.props;
        onClose();
    }

    render(){
        const {
            playlists,
            activePlaylist,
            className,
            isShowing,
        }= this.props;

        let contentRender;
        
        if (isShowing && playlists){
            const dropdownContents = []
            playlists.forEach((val) => {
                const isActive = activePlaylist && activePlaylist == val;

                dropdownContents.push(
                    <div
                        className={`playlist-dropdown-content${isActive ? " dropdown-content-active" : ""}`}
                        onClick={() => this.handleSelectValue(val)}
                    >
                        {val}
                    </div>
                );
            });
            
            contentRender = (
                <div
                    className="playlist-dropdown-content-container"
                    ref={this.componentRef}
                    >
                    { dropdownContents }
                </div>
            )
                    
        }

        return(

            <div
                className={`playlist-dropdown-container${className ? ` ${className}` : ""}`}
            >
                <div
                className="playlist-dropdown-main-button"
                onClick={this.handleCloseButtonClick}
                style={{display: isShowing ? 'flex' : 'none'}}
                >
                    <FontAwesomeIcon icon={faCaretUp}/>
                </div>
                { contentRender}
            </div>

        );

    }

}

ViewPlaylists.propTypes = {
    playlists: PropTypes.array.isRequired,
    activePlaylist: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    onClose: PropTypes.func,
    isShowing: PropTypes.bool,
};

ViewPlaylists.defaultProps = {
    onSelect: () => {},
    onClose: () => {},
    isShowing: false,
};

export default ViewPlaylists;