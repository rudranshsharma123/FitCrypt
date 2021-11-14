import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import "./form.css";
import Button from "react-bootstrap/Button";
class MyForm extends Component {
    render() {
        return (
            <Form className='mb-3' onSubmit={(event) => {
                event.preventDefault()
                const description = this.imageDescription.value
                this.props.uploadImage(description)
            }} >
                <Form.Control type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />

                <div className="form-group mr-sm-2">

                    <Form.Control type="text" placeholder="Description" ref={(input) => { this.imageDescription = input }} required />

                </div>
                <Button type='submit' size="lg" variant="danger" className="d-grid gap2">Upload Your Image to BlockChain</Button>
            </Form>
        );
    }
}



export default MyForm;