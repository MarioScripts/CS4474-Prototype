import './App.css';
import { hot } from 'react-hot-loader';
import React from 'react';
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import NavBar from "./widgets/NavBar/NavBar";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTestModal: false,
            activeContent: "Library content",
        }
    }

    handleOpenModal = () => {
        this.setState({
            showTestModal: true,
        });
    };

    handleCloseModal = () => {
        this.setState({
            showTestModal: false,
        });
    };

    handleNavChange = (content) => {
        this.setState({
            activeContent: content,
        });
    };

    render() {
        const { showTestModal, activeContent } = this.state;
        return (
            <div className="container">
                <Modal
                    width={700}
                    height={500}
                    title="Setup"
                    cancelText="Cancel"
                    text="Continue"
                    isShowing={showTestModal}
                    onClose={this.handleCloseModal}
                />
                <NavBar onChange={this.handleNavChange}/>
                <div className="content">
                    {activeContent}
                </div>

                <div className="controls">
                    <Button
                        className="filled-button"
                        onClick={this.handleOpenModal}
                    >
                        Show Test Modal
                    </Button>
                </div>
            </div>
        );
    }
}

export default hot(module)(App);
