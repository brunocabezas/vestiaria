import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import Gallery from './common/Gallery';
import galleryMock from '../mocks/home-gallery-get-response.json';
import './home.styl';

function Home() {
  const [images, setImages] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Fetching data from API
    superagent.get('/api/home_gallery').end(function(err, res) {
      if (!err && res.ok && res.body && res.body.data) {
        setImages(galleryMock.data.images);
      }
      setImages(galleryMock.data.images);
    });
  });

  return (
    <div className="app__home home">
      <div className="wrapper">
        {images.length > 0 && <Gallery images={images} />}
      </div>
    </div>
  );
}

export default Home;
