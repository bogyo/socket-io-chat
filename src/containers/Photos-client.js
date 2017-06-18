import React, { PureComponent } from 'react';
import '../styles/stylesheets/Photos.css';

const makePic = () => new Promise((resolve, reject) => {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var width = 400;
  var height = 200;

    canvas.width = width;
    canvas.height = height;

  var img = new Image();
    img.width = width;
    img.height = height;
  //  img.crossOrigin="anonymous";

  img.onload = function(event) {
    ctx.drawImage( img, 0, 0, width, height );

    var dataURL = canvas.toDataURL("image/png");

    resolve(dataURL);

  } // error handling

  img.src = 'http://localhost:3000/octopus.png';
});


class PhotosClient extends PureComponent {
  constructor(props){
      super(props);
      this.state = {
        photos:[],
        current:0
      }
    }

  componentDidMount(){
    makePic().then((myImg) => {
      console.log(myImg);

      let list =  [
        ...this.state.photos,
        myImg
      ];
      return this.setState({photos: list, current: this.state.current + 1 });
    }).catch((err) => {console.log(err);})
  }



  render() {
    return (
      <section className="Photos">
        <img src={this.state.photos[0]} alt="alt"/>
      </section>
    );
  }
}

export default PhotosClient;
