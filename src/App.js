import './App.scss';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import NavBar from "./widgets/NavBar/NavBar";

// Mock data for now, just to test some stuff
const playlists = {
    "Playlist 1": {
        content: "Playlist 1 content"
    },
    "Playlist 2": {
        content: "Playlist 2 content"
    },
    "Playlist 3": {
        content: "Playlist 3 content"
    },
    "Playlist 4": {
        content: "Playlist 4 content"
    },
    "Playlist 5": {
        content: "Playlist 5 content"
    },
};

const library = {
    content: "Library content"
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeContent: "Library content",
        }
    }

    handleNavChange = (content) => {
        this.setState({
            activeContent: content,
        });
    };

    render() {
        const { activeContent } = this.state;
        return (
            <div className="container">
                <NavBar
                    onChange={this.handleNavChange}
                    playlists={playlists}
                    library={library}
                />

                <div className="content">
                    {activeContent}
                </div>

                <div className="controls">
                    Player controls here
                </div>
            </div>
        );
    }
}

export default hot(App);
