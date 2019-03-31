import React, { useState, useEffect } from 'react';
import * as actions from '../actions';
import Gallery from '../common/Gallery';
import './home.styl';

// Changing cloudinary url to show auto quality
// https://cloudinary.com/documentation/image_optimization
const useAutoQuality = i =>
  Object.assign({}, i, {
    url: `${i.url.split('upload/')[0]}upload/q_auto/f_auto/${
      i.url.split('upload/')[1]
    }`
  });

function Home() {
  const [images, setImages] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Fetching data from API
    actions.getHomeGallery().end(function(err, res) {
      if (!err && res.ok && res.body && res.body.data) {
        const imagesFromAPI = res.body.data.images.map(useAutoQuality);
        console.log('Home#setImages()', imagesFromAPI);
        setImages(imagesFromAPI);
      }
    });
  }, []);

  return (
    <div className="app__home home">
      <div className="wrapper">
        {images.length > 0 && <Gallery images={images} />}
      </div>
    </div>
  );
}

export default Home;
