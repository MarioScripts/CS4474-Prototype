import React from 'react';
import './NavBar.css';
import MenuItem from "../../components/MenuItem/MenuItem";
import Button from "../../components/Button/Button";

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
        };
    }

    handleActivateItem = (index) => {
        const  { onChange } = this.props;

        this.setState({
            activeIndex: index,
        });

        if (index === 0) {
            onChange(`Library Content`);
        } else {
            onChange(`Playlist${index} Content`);
        }

    };

    render() {
        const { activeIndex } = this.state;

        const playlists = [];
        for(let i = 1; i < 5; i++) {
            playlists.push(
                <MenuItem fontSize={16} active={i === activeIndex } onClick={() => this.handleActivateItem(i)}>Playlist{i}</MenuItem>
            )
        }
        return (
            <div className="navbar-container">
                <MenuItem fontSize={18} active={activeIndex === 0} onClick={() => this.handleActivateItem(0)}>Library</MenuItem>
                <div className="navbar-divider"/>
                {playlists}
                <Button className="filled-button navbar-new-playlist" height={10} width={75} fontSize={14}>New Playlist</Button>
            </div>
        );
    }
}

export default NavBar;