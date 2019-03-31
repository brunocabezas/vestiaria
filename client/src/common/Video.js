import React from 'react';
import PropTypes from 'prop-types';

// get right url format to use with <iframe/> element
const urlIframeParse = url => {
  if (url.includes('vimeo')) {
    const id = url.split('/').reverse()[0];
    return `https://player.vimeo.com/video/${id}`;
  }
  if (url.includes('youtube')) {
    const id = url.split('/watch?v=').reverse()[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  console.warn('invalid video url');
  return null;
};

const propTypes = {
  url: PropTypes.string
};

const defaultProps = {
  url: null
};

const Video = ({ url }) => {
  const parsedUrl = urlIframeParse(url);
  const height = url.includes('youtube') ? '360px' : '100%';

  return !url ? null : (
    <iframe
      title={url}
      width="100%"
      height={height}
      frameBorder="0"
      allowFullScreen
      src={parsedUrl}
    />
  );
};

Video.defaultProps = defaultProps;
Video.propTypes = propTypes;
export default Video;
