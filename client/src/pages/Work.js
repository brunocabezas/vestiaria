import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import Gallery from '../common/Gallery';
import Video from '../common/Video';
import './_work.styl';

const propTypes = {
  workSlug: PropTypes.string.isRequired
};

function Work({ workSlug }) {
  const [mediaType, setMediaType] = useState('video');
  const [work, setWork] = useState({});

  function showGallery() {
    console.log('Work#setMediaType()', 'gallery');
    setMediaType('gallery');
  }

  function showVideo() {
    console.log('Work#setMediaType()', 'video');
    setMediaType('video');
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log('Work#init()');
    actions.getWork(workSlug).end((err, res) => {
      if (!err && res.ok) {
        const workData = res.body.data;
        const worKediaType =
          workData && workData.video && workData.video.length > 0
            ? 'video'
            : 'gallery';

				console.log('Work#setWork()', workData);
        setWork(workData);
        setMediaType(worKediaType);
      }
    });
  }, [workSlug]);

  const hasGallery = work && work.gallery && work.gallery.length > 0;
  const hasVideo = work && work.video && work.video.length > 0;

  const videoButtonClass =
    mediaType !== 'video' ? 'workButton' : 'workButton workButton--active';
  const galleryButtonClass =
    mediaType !== 'gallery' ? 'workButton' : 'workButton workButton--active';

  // If work has both video and gallery, display a selector to switch between them
  const workMediaSelector = !(hasGallery && hasVideo) ? null : (
    <span className="work__mediaSelector">
      <li>
        <button className={videoButtonClass} type="button" onClick={showVideo}>
          video
        </button>
      </li>
      <li className="separator">|</li>
      <li>
        <button className={galleryButtonClass} type="button" onClick={showGallery}>
          photos
        </button>
      </li>
    </span>
  );
  let workMedia = null;
  if (work && mediaType === 'video') {
    workMedia = <Video url={work.video || ''} />;
  } else if (work) {
    workMedia = <Gallery images={work.gallery} />;
  }
  return (
    <div className="work">
      <div className="work__info">
        <h1>{work.name}</h1>
        <p>{work.abstract}</p>
        {workMediaSelector}
      </div>
      <div className="work__media">{workMedia}</div>
      <div className="work__emptySpace" />
    </div>
  );
}

Work.propTypes = propTypes;
export default Work;
