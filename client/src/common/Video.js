import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  url: PropTypes.string
};

const defaultProps = {
  url: null
};

const Video = ({ url }) => {
  let parsedUrl = '';
  let id;
  let splitted;
  let height = "100%";

  if (url.includes('vimeo')) {
    splitted = url.split('/');
    id = splitted[splitted.length - 1];
    parsedUrl = `https://player.vimeo.com/video/${id}`;
  } else if (url.includes('youtube')) {
    splitted = url.split('/watch?v=');
    id = splitted[splitted.length - 1];
		height = "360px";
    parsedUrl = `https://www.youtube.com/embed/${id}`;
  }

  return !url ? null : (
    <iframe
      title={id}
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
