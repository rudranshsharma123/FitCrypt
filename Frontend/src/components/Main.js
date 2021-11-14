import React, { Component } from 'react';
import './/main.css';
import MyForm from './form/form';
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import FormCheck from 'react-bootstrap/FormCheck'
import Button from 'react-bootstrap/Button'
import ImageFeed from './feed/feed';
class Main extends Component {

    render() {
        return (
            <div className="container-fluid md-5 center">
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
                        <div className="content mr-auto ml-auto">
                            <p>&nbsp;</p>
                            <div><h2>Show off your Fitnesss and get rewarded!!!</h2></div>

                            <MyForm uploadImage={this.props.uploadImage} captureFile={this.props.captureFile} />
                            <ImageFeed images={this.props.images} tipImageOwner={this.props.tipImageOwner} />

                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Main;