import './App.css';
import { hot } from 'react-hot-loader';
import React from 'react';
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTestModal: false,
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

    render() {
        const { showTestModal } = this.state;
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
                <div className="navbar">

                </div>
                <div className="content">

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
