import React, { useState, useEffect } from 'react';
import Image from 'react-shimmer';
import PropTypes from 'prop-types';
import './gallery.styl';

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

function useKeyboardEvent(keyCode, callback) {
  useEffect(() => {
    const handler = function(event) {
      if (event.keyCode === keyCode) {
        callback();
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);
}

function Gallery({ images }) {
  // const [images] = useState(images);
  const [currentImage, setCurrentImage] = useState(images[0]._id);
  // const elRef = useRef(images.map(() => null));

  function changeImage(e) {
    // Getting id of next button element
    const { id } = e.currentTarget.nextElementSibling;
    console.log('Gallery#setCurrentImage()', id);
    setCurrentImage(id);
  }

  function onKeyDown(e) {
    const current = images.findIndex(i => i._id === currentImage);
    console.log(e, e.keyCode);
    if (e.keyCode === 39) {
      console.log('Gallery#useKeyboardEvent() -- ArrowNext', current);
      if (current >= 0) {
        setCurrentImage(images[current + 1]._id);
      }
    }
  }

  useEffect(() => {
    const handler = function(event) {
      if (event.keyCode === keyCode) {
        callback();
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);
  // useKeyboardEvent(39, function() {});

  // useKeyboardEvent(37, function() {
  //   const current = images.findIndex(i => i._id === currentImage);
  //   console.log(currentImage);
  //   console.log('Gallery#useKeyboardEvent() -- ArrowPrevious', current);
  //   if (current > 0) {
  //     setCurrentImage(images[current - 1]._id);
  //   }
  // });

  return (
    <div className="gallery">
      {images &&
        images.length > 0 &&
        images.map(i => {
          const className =
            currentImage && currentImage === i._id
              ? 'gallery__img gallery__img--current'
              : 'gallery__img';
          return (
            <button
              onKeyPress={onKeyDown}
              className={className}
              key={i._id}
              id={i._id}
              type="button"
              onClick={changeImage}
            >
              <Image
                src={i.url}
                width="100%"
                height={150}
                style={{ objectFit: 'cover' }}
                delay={25}
                duration={0.9}
              />
            </button>
          );
        })}
    </div>
  );
}

Gallery.propTypes = propTypes;
export default Gallery;
