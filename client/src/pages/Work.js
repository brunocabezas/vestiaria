/* eslint-disable */
import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import PropTypes from 'prop-types';
import Gallery from './common/Gallery';
import Video from './common/Video';
import './work.styl';

const propTypes = {
  workSlug: PropTypes.string.isRequired
};

function Work(props) {
  const [mediaType, setMediaType] = useState('video');
  const [work, setWork] = useState({});
  const [initialized, setInitialized] = useState(false);

  function showGallery() {
		console.log('Work#setMediaType()', 'gallery')
		setMediaType('gallery');
  }

  function showVideo() {
		console.log('Work#setMediaType()', 'video')
		setMediaType('video');
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Fetching data from API
    if(!initialized) {
	    superagent.get(`/api/works/${props.workSlug}`).end((err, res) => {
	      if (!err && res.ok) {
	        const work = res.body.data;
	        const mediaType =
	          work && work.video && work.video.length > 0 ? 'video' : 'gallery';

	        setWork(work);
	        setMediaType(mediaType);
	        setInitialized(true);
	      }
	    });
		}
  });

  const hasGallery = work && work.gallery && work.gallery.length > 0;
  const hasVideo = work && work.video && work.video.length > 0;
  // If work has both video and gallery, display a selector to switch between them
  const workMediaSelector = !(hasGallery && hasVideo) ? null : (
    <span className="work__mediaSelector">
      <li className={videoButtonClass}>
        <button className="workButton" type="button" onClick={showVideo}>
          video
        </button>
      </li>
      <li className="separator">|</li>
      <li className={galleryButtonClass}>
        <button className="workButton" type="button" onClick={showGallery}>
          photos
        </button>
      </li>
    </span>
  );
  const workMedia = !work ? null : mediaType === 'video' ? (
    <Video url={work.video || ''} />
  ) : (
    <Gallery images={work.gallery} />
  );

  const videoButtonClass =
    mediaType !== 'video' ? 'workButton' : 'workButton workButton--active';
  const galleryButtonClass =
    mediaType !== 'gallery' ? 'workButton' : 'workButton workButton--active';

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
// class Work extends React.Component {
//   constructor(props) {
//     super(props);
//     // console.log(props);
//     this.state = {
//       //  hold the current mediaType state, could be 'video' or 'gallery'
//       mediaType: 'video'
//     };
//     this.showGallery = this.showGallery.bind(this);
//     this.showVideo = this.showVideo.bind(this);
//   }
//
//   componentWillMount() {
//     // console.log(nextProps);
//     if (this.props.slug) {
//       superagent.get(`/api/works/${this.props.slug}`).end(
//         function(err, res) {
//           if (!err && res.ok) {
//             const work = res.body.data;
//             const mediaType =
//               work && work.video && work.video.length > 0 ? 'video' : 'gallery';
//
//             this.setState({ work, mediaType });
//           }
//         }.bind(this)
//       );
//     }
//   }
//
//   showGallery() {
//     this.setState({ mediaType: 'gallery' });
//   }
//
//   showVideo() {
//     this.setState({ mediaType: 'video' });
//   }
//
//   render() {
//     const { work } = this.props;
//     const { mediaType } = this.state;
//     const hasGallery = work && work.gallery && work.gallery.length > 0;
//     const hasVideo = work && work.video && work.video.length > 0;
// 		// If work has both video and gallery, display a selector to switch between them
// 		const workMediaSelector = !(hasGallery && hasVideo) ? null : (
// 			<span className="workText">
// 				<li className={videoButtonClass} onClick={this.showVideo}>
// 					video
// 				</li>
// 				<li className="separator">|</li>
// 				<li className={galleryButtonClass} onClick={this.showGallery}>
// 					{' '}
// 					photos
// 				</li>
// 			</span>
// 		);
//     const workMedia =
//       !work ? null : (mediaType === 'video' ? (
//           <Video url={work.video} />
//         ) : (
//           <Gallery images={work.gallery} />
//         ));
//
//     const videoButtonClass =
//       mediaType !== 'video'
//         ? 'workButton'
//         : 'workButton workButton--active';
//     const galleryButtonClass =
//       mediaType !== 'gallery'
//         ? 'workButton'
//         : 'workButton workButton--active';
//
//     return (
//       <div className="work">
//         <div className="work__info">
//           <h1>{work.name}</h1>
//           <p>{work.abstract}</p>
//           {workMediaSelector}
//         </div>
//         <div className="work__media">{workMedia}</div>
// 				<div className="work__emptySpace"></div>
//       </div>
//     )
//   }
// }

Work.propTypes = propTypes;
export default Work;
