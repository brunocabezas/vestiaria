/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      format: PropTypes.oneOf(['png', 'jpg']),
      height: PropTypes.number,
      width: PropTypes.number,
      secure_url: PropTypes.string,
      url: PropTypes.string
    })
  ).isRequired
};

function Gallery(props) {
  const [images, setImages] = useState(props.images);
  const [currentImage, setCurrentImage] = useState(0);

  function changeImage() {
    if (currentImage >= images.length) return;

    setCurrentImage(currentImage + 1);
  }

  const currentImageUrl =
    images && images[currentImage] && images[currentImage].url;
  const style = {
    backgroundImage: `url(${currentImageUrl})`
  };
  return (
    <div className="gallery">
      {images.length > 0 && (
        <div id="imageButton" onClick={changeImage} style={style} />
      )}
    </div>
  );
}

Gallery.propTypes = propTypes;
export default Gallery;
