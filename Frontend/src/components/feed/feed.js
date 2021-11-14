import React, { Component } from "react";
import Card from "react-bootstrap/Card";
// import "./form.css";
import Identicon from 'react-identicons';
import "./feed.css"

import Button from "react-bootstrap/Button";
class ImageFeed extends Component {
    render() {
        return (
            <>
                {
                    this.props.images ?
                        this.props.images.map((image, key) => {

                            // console.log(key, image)
                            return (<>
                                <Card style={{ width: '30rem' }}>
                                    <Card.Img variant="top" src={`https://ipfs.infura.io:5001/api/v0/cat?arg=${image.hashOfImage}`} style={{ maxWidth: '500px' }} />
                                    <Card.Body>

                                        <div className="card-header">
                                            <Identicon string={image.description} size={34} className="iden" />

                                            <p> Author:<small className="text-muted"> {image.author}</small></p>
                                        </div>

                                        <Card.Text>
                                            <div className="card-header">
                                                <p class="fw-bolder">Image Description:</p>
                                                {image.description}
                                            </div>
                                            <div className="card-header">
                                                <p class="fw-bolder">Tips till now:</p>
                                                {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                                            </div>
                                        </Card.Text>

                                        <Button variant="primary" name={image.id}
                                            onClick={(event) => {
                                                let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                                                console.log(event.target.name, tipAmount)
                                                this.props.tipImageOwner(event.target.name, tipAmount)
                                            }}
                                        >
                                            TIP 0.1 ETH</Button>


                                    </Card.Body>
                                </Card>

                            </>)
                        }) : <div > loading... </div>

                }
            </>
        );
    }
}



export default ImageFeed;