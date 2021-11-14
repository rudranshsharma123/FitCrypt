import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import FitCrypt from './contracts/FitCrypt.json'
import Main from './components/Main'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Carding from './components/Card/Card';
import MyForm from './components/form/form';
import Particles from 'react-particles-js';


import ParticleBackground from './components/ParticleBackground';
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'http' })
class App extends Component {

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert("Sorry This browser does not support Web3 as of now, Try adding MetaMask to access this website");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    this.setState({ account: accounts[0] });
    const network_id = await web3.eth.net.getId();
    const networkData = FitCrypt.networks[network_id];
    if (networkData) {
      const fitcrypt = new web3.eth.Contract(FitCrypt.abi, networkData.address);
      this.setState({ fitcrypt: fitcrypt });
      const imageCount = await fitcrypt.methods.imageCount().call();
      console.log(imageCount);
      this.setState({ images: imageCount });

      //load images
      // console.log(await fitcrypt.methods.images(3).call())
      for (let i = 1; i <= imageCount; i++) {
        const image = await fitcrypt.methods.images(i).call();
        console.log(i);
        this.setState({ images: [...this.state.images, image] });
      }

      console.log(this.state.images);
      this.setState({ loading: false });
    } else {
      window.alert("FitCrypt contract not deployed to detected network");
    }

    console.log(network_id);
  }

  captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log('buffer', this.state.buffer);
    }

  }

  uploadImage = async (event) => {
    console.log("uploading image");
    console.log("Uploading it to the IPFS!!!!")
    await ipfs.add(this.state.buffer, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log('ipfs result', result);
      this.setState({ loading: true });
      this.state.fitcrypt.methods.uploadImage(result[0].hash, event).send({ from: this.state.account })
      this.setState({ loading: false });
    });
  }
  tipImageOwner(id, tipAmount) {
    this.setState({ loading: true })
    this.state.fitcrypt.methods.tipTheImage(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      fitcrypt: null,
      images: [],
      loading: true,
    }
    this.uploadImage = this.uploadImage.bind(this)
    this.tipImageOwner = this.tipImageOwner.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }

  render() {
    return (
      <div className="main">
        <div id="particle-container">
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
        </div>
        <Navbar account={this.state.account} />
        {this.state.loading ? <div id="loader" className="text-center mt-5">Wait for a bit the app is Loading...</div> : <Main images={this.state.images.length > 1 ? this.state.images.slice(1, this.state.images.length) : []} tipImageOwner={this.tipImageOwner}
          captureFile={this.captureFile} uploadImage={this.uploadImage} />}

      </div>
    );
  }
}

export default App;