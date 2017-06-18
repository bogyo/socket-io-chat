import React, { PureComponent } from 'react';
import axios from 'axios';
import Carousel from '../components/Carousel';

import '../styles/stylesheets/Photos.css';

//  if no need to handle CORS issues:
//  load image and save it on load. Draw img to canvas, and get data from canvas
//  base64 encoded or blob version are possible
// import PhotosClient from './Photos-client';

// node-server used as a middleware for fetching images from lorempixel
// and serve to the frontend. Reason: avoid CORS issues

// goes to node-server reqesting an image url
// node-server goes to lorempixel.com request an image
// and gives back the location of the saved image

// possible TODOS:
// - request  more images at the same time. - for better performance if needed

const createUrl = (settings) => {
  const url = `getphoto?width=${settings.width}&height=${settings.height}`;

  return url;
}
class Photos extends PureComponent {
  constructor(props){
      super(props);
      this.state = {
        photos:[],
        current:0,
        settings: this.props.settings
      }
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
  }

  componentDidMount(){
    const { settings, photos } = this.state;
    console.log(this.state);
    const url = createUrl(settings);
    console.log(url, 'url');

    axios.get(url).then((response) => {
      let list =  [
        ...photos,
        response.data
      ];

      return this.setState({photos: list});
    }).catch((err) => {console.log('err', err);});
  }

  next(){
  //  console.log('ask foto from carousel - by touch');
    const { photos, current, settings } = this.state;

    const url = createUrl(settings);

  // if last image get a new one
    if (photos.length - 1 === current ) {
      axios.get(url).then((response) => {
        let list =  [
        ...photos,
        response.data
       ];

        return this.setState({photos: list, current: current + 1 });

      }).catch((err) => {console.log(err);});
    } else {
      this.setState({current: current + 1 });
    }
  }

  previous(){
    const { current } = this.state;
    const previous = current === 0 ? 0 : current - 1;

    this.setState({current: previous });
  };

  componentWillUnmount(){
    console.log('unmount');
     document.removeEventListener("click", this.next);
  }


  render() {
    const { photos, current } = this.state;

    return (
      <section className="Photos">
        <div className="slideShow">
          <div className="prev-arrow" onClick={this.previous}></div>
          {photos[current] ?
            <Carousel
              img={photos[current]}
              next={this.next}
              previous={this.previous} /> : <div>'Loading...'</div>}
          <div className="next-arrow" onClick={this.next}></div>
        </div>
      </section>
    );
  }
}

export default Photos;
