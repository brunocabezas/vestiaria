import React, { useReducer, useEffect, useCallback } from 'react';
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

function Gallery({ images }) {
  const [currentImg, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'nextIndex') {
        // If index is bigger than total img count, set it to zero
        const index = state.index >= state.count - 1 ? 0 : state.index + 1;
        return { ...state, index };
      }
      if (action.type === 'previousIndex') {
        // If index is zero, set last index available
        const index = state.index === 0 ? state.count - 1 : state.index - 1;
        return { ...state, index };
      }
      return state;
    },
    { index: images.length > 16 ? 15 : 0, count: images.length }
  );

  function onImageClick() {
    dispatch({ type: 'nextIndex' });
    console.log('Gallery#onImageClick()');
  }

  const changeImgCallback = useCallback(
    e => {
      // right and down arrow keys
      if (e.keyCode === 39 || e.keyCode === 40) {
        dispatch({ type: 'nextIndex' });

        // left and up arrow keys
      } else if (e.keyCode === 37 || e.keyCode === 38) {
        dispatch({ type: 'previousIndex' });

        // enter
      } else if (e.keyCode === 13) {
        dispatch({ type: 'nextIndex' });
      }

      console.log('Gallery#changeImgCallback()');
    },
    [dispatch]
  );

  // Gallery init
  useEffect(() => {
    window.addEventListener('keydown', changeImgCallback);
    return () => {
      window.removeEventListener('keydown', changeImgCallback);
    };
  }, [changeImgCallback]);

  return (
    <div className="gallery">
      {images &&
        images.length > 0 &&
        images.map((img, ix) => {
          const className =
            currentImg.index === ix
              ? 'gallery__img gallery__img--current'
              : 'gallery__img';

          return (
            <button
              className={className}
              key={img._id}
              id={img._id}
              type="button"
              onClick={onImageClick}
            >
              <Image
                src={img.url}
                width="100%"
                title="Next image"
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
